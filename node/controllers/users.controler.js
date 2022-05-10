const User = require("../dataBase/Users.model");

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      const { limit = 20, page = 1 } = req.query;
      const skip = (page - 1) * limit;

      const users = await User.find().limit(limit).skip(skip);
      const count = await User.count({});

      res.status(200).json({
        page,
        perPage: limit,
        data: users,
        count
      });
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const createUser = await User.create(req.body);  

      res.status(200).json(createUser);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userIndex } = req.params;
      const user = await User.findByIdAndUpdate(userIndex, req.body, {
        new: true
      });
  
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { userIndex } = req.params;
      const user = await User.findById(userIndex);
  
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) =>{
    try {
      const {userIndex} = req.params;
      const user = await User.findById(userIndex);
  
      res.send(`${user.name} was deleted`);
    } catch (error) {
      next(error);
    }
  }
}
