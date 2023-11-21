import express from 'express' 
import * as User from "../helpers/User.js"

const userRouter=express.Router()


userRouter.get(`/:id/followers`, User.getUserFollower)
userRouter.get(`/:id/following`, User.getUserFollowing)

// to follow a user
userRouter.post(`/:id/follow`, async (req, res) => {
    await User.followUser(req.params.id, req.body.followingId)
    res.send('seccess follow')
})

// to unfollow a user
userRouter.post(`/:id/unfollow`, async (req, res) => {
    await User.unfollowUser(req.params.id, req.body.unfollowingId)
    res.send('success unfollow')
})

// to remove a user
userRouter.post(`/:id/remove`, async (req, res) => {
    // await User.removeUser(req.params.id)
    // await User.unfollowUser(req.params.id, req.body.removingId)
    await User.removeUser(req.params.id, req.body.removingId)
    res.send('success remove')
})

//get the profile lists 
userRouter.get(`/:id/profileInfo`, User.getUserData2)

export default userRouter;