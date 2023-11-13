const UsersMongoDao = require("../usersMongoDao.js")

//const modeloUsers = require("../DB/models/users.modelo.js");

class UserRepository {
  async createUser(userData) {
    try {
      const user = await UsersMongoDao.createUser(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await UsersMongoDao.getUserByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try {
      const users = await UsersMongoDao.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, userData) {
    try {
      const updatedUser = await UsersMongoDao.findByIdAndUpdate(
        userId,
        userData,
        {
          new: true,
        }
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      await UsersMongoDao.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserRepository();
