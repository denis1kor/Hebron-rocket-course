const User = require('../dataBase/Users.model');
const SomeError = require('../errors/SomeEror');

const checkEmailExistance = async (req, res, next) => {
  try {
    const { email = '' } = req.body;

    if (!email) {
      throw new SomeError('Email is required', 400);
    }

    if (!email.includes('@')) {
      throw new SomeError('Email needs "@"', 400);
    }

    const emailAlredyExist = await User.findOne({ email: email.toLowerCase().trim() });

    if (emailAlredyExist) {
      throw new SomeError('User with this email already present', 409);
    }

    next();
  } catch (error) {
    next(error);
  }
}

const checkUserExistence = async (req, res, next) => {
  try {
    const { userIndex } = req.params;
    req.User = await User.findById(userIndex);

    next();
  } catch (error) {
    next(new SomeError('User not found', 404));
  }
}

const checkAge = (req, res, next) => {
  try {
    const { age } = req.body;

    if (!Number.isInteger(age)) {
      throw new Error('Age is NaN');
    }

    if (age > 100 || age < 10) {
      throw new Error('Age is not valid');
    }

    next();
  } catch (error) {
    next(error);
  }
}

const checkName = (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new Error('Name is required');
    }

    next();
  } catch (error) {
    next(error);
  }
}


module.exports = {
  checkEmailExistance,
  checkUserExistence,
  checkAge,
  checkName
}
