const {Router} = require('express');

const carsController = require('../controllers/cars.controller');
const carsRouter = Router();

carsRouter.get('/', carsController.getAllCars);

carsRouter.post('/', carsController.createCar);

carsRouter.get('/:carsIndex', carsController.getCarById);

carsRouter.delete('/:carsIndex', carsController.deleteCar);

module.exports = carsRouter;