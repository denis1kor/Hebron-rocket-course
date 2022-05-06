const User = require('../dataBase/Users.model');

const checkEmailExistance = async (req, res, next) => {
    try {
      const { email = '' } = req.body;
  
      if (!email) {
        throw new Error('Email is required');
      }

      if(!email.includes('@'))
      {
        throw new Error('Email needs "@" ');
      }
  
      const emailAlredyExist = await User.findOne({ email: email.toLowerCase().trim() });
  
      if (emailAlredyExist) {
        throw new Error('User with this email already present');
      }
  
      next();
    } catch (error) {
      res.json(error);
    }
  }

const checkUserExistence = async (req, res, next) => {
    try {
        const { userIndex } = req.params;
        await User.findById(userIndex);

        next();
    } catch (error) {
        res.json(error);
    }
}

const checkAge = (req, res, next) => {
    try {
        const {age} = req.body;

        if(!Number.isInteger(age)){
            throw new Error('Age is NaN');
        }

        if(age > 100 && age < 10){
            throw new Error('Age is not valid');
        }

        next();
    } catch (error) {
        res.json(error);
    }
}

const checkName = (req, res, next) => {
    try {
        const {name} = req.body;

        if(!name){
            throw new Error('Name is required');
        }

        next();
    } catch (error) {
        res.json(error);
    }
}


module.exports = {
    checkEmailExistance,
    checkUserExistence,
    checkAge,
    checkName
}