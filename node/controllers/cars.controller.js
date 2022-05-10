const Car = require('../dataBase/Cars.model');

module.exports = {
  getAllCars: async (req, res, next) => {
    try {
      const { limit = 20, page = 1 } = req.query;
      const skip = (page - 1) * limit;

      const Cars = await Car.find().limit(limit).skip(skip);
      const count = await Car.count({});

      res.status(200).json({
        page,
        perPage: limit,
        data: Cars,
        count
      });
    } catch (error) {
      next(error)
    }

  },

  createCar: async (req, res, next) => {
    try {
      const createCar = await Car.create(req.body)

      res.status(200).json(createCar);
    } catch (error) {
      next(error)
    }
  },

  updateCar: async (req, res, next) => {
    try {
      const { carsIndex } = req.params;
      const car = await Car.findByIdAndUpdate(carsIndex, req.body, {
        new: true
      });
    
      res.status(200).json(car);
    } catch (error) {
      next(error)
    }
  },

  getCarById: async (req, res, next) => {
    try {
      const { carsIndex } = req.params;
      const car = await Car.findById(carsIndex);

      res.status(200).json(car);
    } catch (error) {
      next(error)
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      const { carsIndex } = req.params;
      const car = await Car.findById(carsIndex);
    
      res.status(200).send(`${car.title} was deleted`);
    } catch (error) {
      next(error)
    }
  }
}
