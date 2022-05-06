const express = require('express');
const {engine} = require('express-handlebars');
const mongoose = require('mongoose');

const {PORT} = require('./config/config');
const carsRouter = require('./routers/cars.router');
const usersRouter = require('./routers/users.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/Courses').then(() => {
    console.log('Connected');
})

app.engine('.hbs', engine({defaultLayout:false}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/users', usersRouter);
app.use('/cars', carsRouter);

app.listen(PORT, () => {
    console.log('server started');
});