import fs from "fs"

// Get data from the mock data
// This is only used for testing purpose
async function getUserData() {
    try {
        const data = fs.readFileSync('./public/userMockData.json')
        return JSON.parse(data)
    } catch (err) {
        console.error("Could not load users mock data:", err)
        throw err
    }
}

// async function saveUserData(data) {

// }

async function getUserFollower(userId) {
    const data = await getUserData()
    const user = data.users.find(user => user.id === userId)
    if (!user) {
        return res.status(404).send({ message: 'User not found.' });
    }

    const followerIds = user.followers;
    const followers = followerIds.map(id => data.users.find(u => u.id === id.toString()));

    return followers
}

async function getUserFollowing(userId) {
    const data = await getUserData()
    const user = data.users.find(user => user.id === userId)
    if (!user) {
        return res.status(404).send({ message: 'User not found.' });
    }

    const followingIds = user.following;
    const following = followingIds.map(id => data.users.find(u => u.id === id.toString()));

    return following
}

export {
    getUserData,
    getUserFollower,
    getUserFollowing,
}