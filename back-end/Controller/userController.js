import { User } from 'jikan4.js';
import UserService from '../Service/userService.js';

class UserController {
    async getUserData(req, res) {
        try {
            const userData = await UserService.getUserData(req.params.id);
            res.status(200).json(userData);
        } catch(err) {
            res.status(404).json({ error: 'Cannot find user' });
        }
    }

    async getUserFollower(req, res) {
        try {
            const userData = await UserService.getUserData(req.params.id);
            const followerIds = userData.followers;
            const followers = []
            for (const id of followerIds) {
                const followData = await UserService.getUserData(id.toString());
                followers.push(followData);
            }
            res.status(200).json(followers);
        } catch(err) {
            res.status(404).json({ error: 'Cannot find user' });
        }
    }

    async getUserFollowing(req, res) {
        try {
            const userData = await UserService.getUserData(req.params.id);
            const followingIds = userData.following;
            const following = []
            for (const id of followingIds) {
                const followData = await UserService.getUserData(id.toString());
                following.push(followData);
            }
            res.status(200).json(following);
        } catch(err) {
            res.status(404).json({ error: 'Cannot find user' });
        }
    }

    // async followUser(req, res) {
    //     try {
    //         await UserService.followUser(req.params.id, req.body.followingId);
    //         res.status(200).json({ message: 'Successfully followed' });
    //     } catch(err) {
    //         res.status(401).json({ error: 'Failed to follow' });
    //     }
    // }


}

export default new UserController();