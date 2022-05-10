const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const { PORT, MONGO_URL } = require('./config/config');
const carsRouter = require('./routers/cars.router');
const usersRouter = require('./routers/users.router');
const SomeError = require('./errors/SomeEror');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(MONGO_URL).then(() => {
  console.log('Connected');
})

app.engine('.hbs', engine({ defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/users', usersRouter);
app.use('/cars', carsRouter);

app.use('*', _notFoundEror)
app.use(_mainErrors)

function _notFoundEror(req, res, next) {
  next(new SomeError('Not found', 404));
}

// eslint-disable-next-line no-unused-vars
function _mainErrors(err, req, res, next) {
  console.log(err);

  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Server error',
      status: err.status || 500
    });
}

app.listen(PORT, () => {
  console.log('server started');
});
