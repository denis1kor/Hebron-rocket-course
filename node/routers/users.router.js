const { Router } = require('express');

const usersController = require('../controllers/users.controler');
const usersMiddlewares = require('../middlewares/user.middlewars')

const usersRouter = Router();

usersRouter.get('/', usersController.getAllUser);

usersRouter.post('/',
usersMiddlewares.checkName,
  usersMiddlewares.checkAge,
  usersMiddlewares.checkEmailExistance,
  usersController.createUser);

usersRouter.patch('/:userIndex',
  usersMiddlewares.checkAge,
  usersMiddlewares.checkName,
  usersMiddlewares.checkUserExistence,
  usersController.updateUser);

usersRouter.get('/:userIndex', usersMiddlewares.checkUserExistence, usersController.getUserById);

usersRouter.delete('/:userIndex', usersMiddlewares.checkUserExistence, usersController.deleteUser);

module.exports = usersRouter;
