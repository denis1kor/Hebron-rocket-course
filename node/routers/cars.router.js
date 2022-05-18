const {Router} = require('express');

const carsController = require('../controllers/cars.controller');
const carsMiddlewar = require('../middlewares/car.middlewares')
const carsRouter = Router();

carsRouter.get('/', carsController.getAllCars);

carsRouter.post('/', carsMiddlewar.checkModel, carsMiddlewar.checkYear, carsController.createCar);

carsRouter.patch('/;carsIndex', carsMiddlewar.checkCarExistence, carsController.updateCar)

carsRouter.get('/:carsIndex', carsMiddlewar.checkCarExistence, carsController.getCarById);

carsRouter.delete('/:carsIndex', carsMiddlewar.checkCarExistence, carsController.deleteCar);

module.exports = carsRouter;
