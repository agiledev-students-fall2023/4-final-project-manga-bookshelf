import express from 'express' 
import * as User from "../helpers/User.js"
import UserService from '../Service/userService.js'

const userRouter=express.Router()


userRouter.get(`/:username/follower`, UserService.getUserFollower)
userRouter.get(`/:username/following`, UserService.getUserFollowing)

// to follow a user
userRouter.post(`/:id/follow`, async (req, res) => {
    // await User.followUser(req.params.id, req.body.followingId)
    res.send('seccess follow')
})

// to unfollow a user
userRouter.post(`/:id/unfollow`, async (req, res) => {
    // await User.unfollowUser(req.params.id, req.body.unfollowingId)
    res.send('success unfollow')
})

// to remove a user
userRouter.post(`/:id/remove`, async (req, res) => {
    // await User.removeUser(req.params.id)
    // await User.unfollowUser(req.params.id, req.body.removingId)
    // await User.removeUser(req.params.id, req.body.removingId)
    res.send('success remove')
})

//get the profile lists 
userRouter.get(`/:username/profile`, UserService.getUserData)

export default userRouter;