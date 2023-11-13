import fs from 'fs';

/* Need to modify getUserData() and saveUserData() to fetch data from database */
async function getUserData() {
    try {
        const data = await fs.promises.readFile('./public/userMockData.json')
        return JSON.parse(data)
    } catch (err) {
        console.error("Could not load users mock data:", err)
        throw err
    }
}

/* write is sync to avoid write conflict */
async function saveUserData(data) {
    try {
        const dataString = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
        // await fs.promises.writeFile('./public/userMockData.json', dataString)
        fs.writeFileSync('./public/userMockData.json', dataString)
    } catch (err) {
        console.error("Could not save users mock data:", err)
        throw err
    }
}

async function followUser(userId, followId) {
    const data = await getUserData()
    const user = data.users.find(user => user.id === userId)
    if (!user) {
        return res.status(404).send({ message: 'User not found.' });
    }

    const followUser = data.users.find(user => user.id === followId)
    if (!followUser) {
        return res.status(404).send({ message: 'User not found.' });
    }

    if (user.following.includes(parseInt(followId, 10))) {
        return
        // return res.status(400).send({ message: 'Already following user.' });
    }

    user.following.push(parseInt(followId, 10))
    followUser.followers.push(parseInt(userId))

    await saveUserData(data)
}

async function unfollowUser(userId, unfollowId) {
    const data = await getUserData()
    const user = data.users.find(user => user.id === userId)
    if (!user) {
        return res.status(404).send({ message: 'User not found.' });
    }

    const unfollowUser = data.users.find(user => user.id === unfollowId)
    if (!unfollowUser) {
        return res.status(404).send({ message: 'User not found.' });
    }

    if (!user.following.includes(parseInt(unfollowId, 10))) {
        return
        // return res.status(400).send({ message: 'Not following user.' });
    }

    user.following = user.following.filter(id => id !== parseInt(unfollowId, 10))
    unfollowUser.followers = unfollowUser.followers.filter(id => id !== parseInt(userId))

    await saveUserData(data)
}

async function removeUser(userId, removeId) {
    const data = await getUserData()
    const user = data.users.find(user => user.id === userId)
    if (!user) {
        return res.status(404).send({ message: 'User not found.' });
    }

    const removeUser = data.users.find(user => user.id === removeId)
    if (!removeUser) {
        return res.status(404).send({ message: 'User not found.' });
    }

    if (!user.followers.includes(parseInt(removeId, 10))) {
        return
        // return res.status(400).send({ message: 'User is not following you.' });
    }

    user.following = user.following.filter(id => id !== parseInt(removeId, 10))
    removeUser.followers = removeUser.followers.filter(id => id !== parseInt(userId))

    user.followers = user.followers.filter(id => id !== parseInt(removeId, 10))
    removeUser.following = removeUser.following.filter(id => id !== parseInt(userId))
    await saveUserData(data)

}

async function getUserCurrentReading(userId) {
    const data = await getUserData()
    const user = data.users.find(user => user.id === userId)
    if (!user) {
        return res.status(404).send({ message: 'User not found.' });
    }

    const currentReadingIds = user.currentReading;
    // const currentReading = currentReadingIds.map(id => data.users.find(u => u.id === id.toString()));

    return currentReading

}

export {
    followUser,
    unfollowUser,
    removeUser
}