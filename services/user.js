const models = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 6;

class User {

  /**
   * Creates new user.
   * 
   * @param {obj} user 
   */
  static async create(user) {
    try {
      const { username, password } = user;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      return await models.User.create({
        username,
        password: hash
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  /**
   * Gets user by username.
   * 
   * @param {string} username 
   */
  static async findByUsername(username) {
    try {
      return await models.User.findOne({ where: { username }});
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  /**
   * Checks is user authenticated.
   * 
   * @param {obj} user 
   */
  static async isAutheticated(user) {
    try {
      const { username, password } = user;
      const dbUser = await this.findByUsername(username);
      if (dbUser) {
        const match = await bcrypt.compare(password, dbUser.password);
        if (match) {
          console.log('dbUser', dbUser.username)
          return dbUser;
        } 
      }

      return false;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  /**
   * Gets user by id.
   * 
   * @param {number} id 
   */
  static async findById(id) {
    try {
      return await models.User.findOne(id);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getPatients(userId) {
    try {
      return await models.User.findOne({ where: { id: userId } ,include: models.Patient });
    } catch (err) {
      console.error(err); 
      return null;
    }
  }
}

module.exports = User;
