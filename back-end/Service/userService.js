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

  // to change bio for a user
  async changeBio(req, res) {
    try {
      const username = req.params.username;
      const newBio = req.body.bio; // Assuming the new bio is sent in the request body
      const user = await UserModel.findOneAndUpdate(
        { username: username },
        { $set: { bio: newBio } }, // Use $set to update the bio field
        { new: true }
      );
  
      if (!user) {
        throw new Error("User not found");
      }
  
      res.json({ user, message: 'Bio updated successfully' });
    } catch (err) {
      res.status(404).json({ error: "Cannot update bio" });
    }
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


  /* Update data to database. Only for backend without database */
  /* Don't use it yet. It is not working */
  // async updateUserData(userData) {
  //   try {
  //     userMockData.users.push(userData);
  //     const dataString =
  //       typeof userMockData === "string"
  //         ? userMockData
  //         : JSON.stringify(userMockData, null, 2);
  //     await fs.promises.writeFile("./public/userMockData.json", dataString);
  //   } catch (err) {
  //     console.error("Could not save users mock data:", err);
  //     throw err;
  //   }
  // }
}

export default new UserService();