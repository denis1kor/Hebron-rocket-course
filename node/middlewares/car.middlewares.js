const Car = require('../dataBase/Cars.model');
const SomeError = require('../errors/SomeEror');

const checkCarExistence = async (req, res, next) => {
  try {
    const { carIndex } = req.params;
    req.Car = await Car.findById(carIndex);

    next();
  } catch (error) {
    next(new SomeError('Cars not found', 404));
  }
}

const checkModel = (req, res, next) => {
  try {   
    const {model} = req.body;

    if(!model){
      throw new Error('Model is required');
    }

    next();
  } catch (error) {
    next(error);
  }
}

const checkYear = (req, res, next) => {
  try {   
    const {year} = req.body;

    if(!year){
      throw new Error('Year is required');
    }

    if(year < 1940 || year > 2022){
      throw new Error('Year is not valid');
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkCarExistence,
  checkModel,
  checkYear
}
