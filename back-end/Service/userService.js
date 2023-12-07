import UserModel from "../Model/userModel.js";


class UserService {
  /* Create a new user, mainly for log in */
  // async createUser(data) {}

  // finds an INDIVIDUAL USER
  async getUserData(req, res) {
    try {
      const userData = await UserModel.findOne({
        username: req.params.username,
      }).select("-password");
      res.status(200).json(userData);
    } catch (err) {
      res.status(404).json({ error: "Cannot find user" });
    }
  }

  // finds followers of a user
  async getUserFollower(req, res) {
    try {
      const userData = await UserModel.findOne({
        username: req.params.username,
      }).select("follower -_id");
      const followerNames = userData.follower;
      const followers = [];
      for (const name of followerNames) {
        const followData = await UserModel.findOne({
          username: name.toString(),
        }).select("-password");
        followers.push(followData);
      }
      res.status(200).json(followers);
    } catch (err) {
      res.status(404).json({ error: "Cannot find user" });
    }
  }

  // finds followings of a user
  async getUserFollowing(req, res) {
    try {
      const userData = await UserModel.findOne({
        username: req.params.username,
      }).select("following -_id");
      const followingNames = userData.following;
      const followings = [];
      for (const name of followingNames) {
        const followData = await UserModel.findOne({
          username: name.toString(),
        }).select("-password");
        followings.push(followData);
      }
      res.status(200).json(followings);
    } catch (err) {
      res.status(404).json({ error: "Cannot find user" });
    }
  }

  //change username
  async changeUser(req, res) {
      const newUsername = req.body.username;

      await UserModel.findByIdAndUpdate(req.user.id,{ "username": newUsername },)
        .then(docs => {
          console.log("username updated") 
          res.json({
            success: true, 
            message: "username updated" 
          })
        }).catch(err => {
          console.error(err) 
          res.status(500).json({
            success:false, 
            message: "failed to update username", err
          })
        })


  }

  // to change bio for a user

  async changeBio(req, res) {
    const newBio = req.body.bio;

    await UserModel.findByIdAndUpdate(req.user.id,{ "bio": newBio },)
      .then(docs => {
        console.log("bio updated") 
        res.json({
          success: true, 
          message: "bio updated" 
        })
      }).catch(err => {
        console.error(err) 
        res.status(500).json({
          success:false, 
          message: "failed to update bio", err
        })
      })


}
  // to change the profile picture of a user
  async changeProfileImage(req, res) {
    console.log(req.file); 
    const newImage = {
      data: req.file.buffer, 
      contentType: req.file.mimetype
    }

    await UserModel.findByIdAndUpdate(req.user.id,{ "profileImg": newImage },)
      .then(docs => {
        console.log("profileImage updated") 
        res.json({
          success: true, 
          message: "profileImage updated" 
        })
      }).catch(err => {
        console.error(err) 
        res.status(500).json({
          success:false, 
          message: "failed to update profileImage", err
        })
      })

}

  // to follow a user
  async followUser(req, res) {
    try {
      const username = req.params.username;
      const followingName = req.body.followingName;
      const user = await UserModel.findOneAndUpdate(
        { username: username },
        { $addToSet: { following: followingName } },
        { new: true }
      );
      const followedUser = await UserModel.findOneAndUpdate(
        { username: followingName },
        { $addToSet: { follower: username } },
        { new: true }
      );
      if (!user || !followedUser) {
        throw new Error("User not found");
      }
      res.send('success follow')
    } catch (err) {
      res.status(404).json({ error: "Cannot follow user" });
    }
  }

  // to unfollow a user
  async unfollowUser(req, res) {
    try {
      const username = req.params.username;
      const unfollowingName = req.body.unfollowingName;
      const user = await UserModel.findOneAndUpdate(
        { username: username },
        { $pull: { following: unfollowingName } },
        { new: true }
      );
      const unfollowedUser = await UserModel.findOneAndUpdate(
        { username: unfollowingName },
        { $pull: { follower: username } },
        { new: true }
      );
      if (!user || !unfollowedUser) {
        throw new Error("User not found");
      }
      res.send("success unfollow");
    } catch (err) {
      res.status(404).json({ error: "Cannot unfollow user" });
    }
  }

  // to remove a user from follower and following list
  async removeUser(req, res) {
    try {
      const username = req.params.username;
      const removingName = req.body.removingName;
      const user = await UserModel.findOneAndUpdate(
        { username: username },
        { $pull: { follower: removingName, following: removingName } },
        { new: true }
      );
      const removedUser = await UserModel.findOneAndUpdate(
        { username: removingName },
        { $pull: { following: username, follower: username } },
        { new: true }
      );
      if (!user || !removedUser) {
        throw new Error("User not found");
      }
      res.send("success remove");
    } catch (err) {
      res.status(404).json({ error: "Cannot remove user" });
    }
  }


  // search for users
  async searchUser(req, res) {
    try {
      const username = req.params.username;
      const regex = new RegExp("^" + username, "i");
      const user = await UserModel.find({
        username: { $regex: regex},
      }).select("username -_id");
      if (!user) {
        throw new Error("User not found");
      }
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: "Cannot find user" });
    }
  }
}

export default new UserService();