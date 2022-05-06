const User = require("../dataBase/Users.model");

module.exports = {
  getAllUser: async (req, res) => {
    const Users = await User.find();

    res.status(200).json(Users)
  },

  createUser: async (req, res) => {
    const createUser = await User.create(req.body);  

    res.status(200).json(createUser);
  },

  updateUser: async (req, res) => {
    const { userIndex } = req.params;
    const user = await User.findByIdAndUpdate(userIndex, req.body);

    res.status(200).json(user);
  },

  getUserById: async (req, res) => {
    const { userIndex } = req.params;
    const user = await User.findById(userIndex);

    res.status(200).json(user);
  },

  deleteUser: async (req,res) =>{
    const {userIndex} = req.params;
    const user = await User.findById(userIndex);

    res.send(`${user.name} was deleted`);
  }
};