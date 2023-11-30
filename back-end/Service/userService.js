import UserModel from "../Model/userModel.js";

class UserService {
  /* Create a new user, mainly for log in */
  // async createUser(data) {}

  // finds an INDIVIDUAL USER
  async getUserData(req, res) {
    try {
      const userData = await UserModel.findOne({ username: req.params.username }).select('-password')
      res.status(200).json(userData);
    } catch(err) {
      res.status(404).json({ error: 'Cannot find user' });
    }
  }

  // finds followers of a user
  async getUserFollower(req, res) {
    try {
      const userData = await UserModel.findOne({ username: req.params.username }).select('follower -_id');
      const followerNames = userData.follower;
      const followers = []
      for (const name of followerNames) {
        const followData = await UserModel.findOne({ username: name.toString() }).select('-password');
        followers.push(followData);
      }
      res.status(200).json(followers);
    } catch(err) {
      res.status(404).json({ error: 'Cannot find user' });
    }
  }

  // finds followings of a user
  async getUserFollowing(req, res) {
    try {
      const userData = await UserModel.findOne({ username: req.params.username }).select('following -_id');
      const followingNames = userData.following;
      const followings = []
      for (const name of followingNames) {
        const followData = await UserModel.findOne({ username: name.toString() }).select('-password');
        followings.push(followData);
      }
      res.status(200).json(followings);
    } catch(err) {
      res.status(404).json({ error: 'Cannot find user' });
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
