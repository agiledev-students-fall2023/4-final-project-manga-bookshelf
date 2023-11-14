import userMockData from "../public/userMockData.json" assert { type: "json" };
import fs from "fs";

class UserService {
  /* Create a new user, mainly for log in */
  // async createUser(data) {}

  /* Get user data from database - need to update when connect to database */
  //finds an INDIVIDUAL USER
  async getUserData(userId) {
    const user = userMockData.users.find((user) => user.id === userId);
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
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
