const { Router } = require('express');

const usersController = require('../controllers/users.controler')

const usersRouter = Router();

usersRouter.get('/', usersController.getAllUser);

usersRouter.post('/', usersController.createUser);

usersRouter.get('/:userIndex', usersController.getUserById);

module.exports = usersRouter;