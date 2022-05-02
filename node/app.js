const express = require('express');
const {engine} = require('express-handlebars');

const {PORT} = require('./config/config');
const carsRouter = require('./routers/cars.router');
const usersRouter = require('./routers/users.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', engine({defaultLayout:false}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/users', usersRouter);
app.use('/cars', carsRouter);

app.listen(PORT, () => {
    console.log('server started');
})