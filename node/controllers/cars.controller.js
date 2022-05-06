const Car = require('../dataBase/Cars.model');

module.exports = {
    getAllCars: async (req, res) => {
        const Cars = await Car.find();

        res.status(200).json(Cars);
    },

    createCar: async (req, res) => {
        const createCar = await Car.create(req.body)

        res.status(200).json(createCar);
    },

    updateCar: async (req, res) => {
        const {carsIndex} = req.params;
        const car = await User.findByIdAndUpdate(carsIndex, req.body, {
            new: true
        });
    
        res.status(200).json(car);
      },

    getCarById: async (req, res) => {
        const {carsIndex} = req.params;
        const car = await Car.findById(carsIndex);

        res.status(200).json(car);
    },

    deleteCar: async (req,res) =>{
        const {carsIndex} = req.params;
        const car = await Car.findById(carsIndex);

        res.status(200).send(`${car.title} was deleted`);
    }
};