import express from 'express' 
import * as User from "../helpers/User.js"
import UserService from '../Service/userService.js'

const userRouter=express.Router()

// get list of follower and following of a user
userRouter.get(`/:username/follower`, UserService.getUserFollower)
userRouter.get(`/:username/following`, UserService.getUserFollowing)

// to follow a user
userRouter.post(`/:username/follow`, UserService.followUser)

// to unfollow a user
userRouter.post(`/:username/unfollow`, UserService.unfollowUser)

// to remove a user
userRouter.post(`/:username/remove`, UserService.removeUser)

//get the profile lists 
// userRouter.get(`/:username/profile`, UserService.getUserData)



export default userRouter;