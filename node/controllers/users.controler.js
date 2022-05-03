const DB = require("../dataBase/users");

module.exports = {
  getAllUser: (req, res) => {
    res.render('users', {DB});
  },

  createUser: (req, res) => {
    DB.push(req.body);

    res.render('users', {DB});
  },

  getUserById: (req, res) => {
    const { userIndex } = req.params;
    const user = DB[userIndex];

    if (!user) {
      res.sendStatus(404);
    };

    const usersId = user.id;
    const usersName = user.name;
    res.render('oneOfUsers', {usersId, usersName});
  },

  deleteUser: (req,res) =>{
    const {userIndex} = req.params;
    const user = DB[userIndex];
    console.log(user);

    if(!user){
      res.sendStatus(404);
      return;
    }

    res.send(`${user.name} was deleted`);
  }
};