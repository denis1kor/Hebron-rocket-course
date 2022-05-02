const {Router} = require('express');
const { Module } = require('module');

const carsController = require('../controllers/cars.controller');

const carsRouter = Router();

carsRouter.get('/', carsController.getAllCars);

carsRouter.post('/', carsController.createCar);

carsRouter.get('/:carsIndex', carsController.getCarById);

module.exports = carsRouter;