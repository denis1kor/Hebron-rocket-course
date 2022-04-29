const express = require('express');

const {engine} = require('express-handlebars');

const usersList = require('./dataBase/users');

const carsList = require('./dataBase/cars')

const app = express();

app.engine('.hbs', engine({defaultLayout:false}))
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/welcome', (req, res) => {
    res.render('welcome');
})

app.get('/users', (req, res) => {
    res.render('users', {usersList});
})

app.get('/users/:userIndex', (req, res) => {
    const {userIndex} = req.params;

    if(!usersList[userIndex]){
        res.sendStatus(404);
    }

    const usersId = usersList[userIndex].id;
    const usersName = usersList[userIndex].name;
    res.render('oneOfUsers', {usersId, usersName});
})

app.get('/cars/:carIndex', (req, res) => {
    const {carIndex} = req.params;

    if(!carsList[carIndex]){
        res.sendStatus(404);
    }
    
    const carTitle = carsList[carIndex].title;
    res.render('oneOfCars', {carTitle});
})

app.get('/cars', (req, res) => {
    res.render('cars', {carsList})
})

app.listen(5000, () => {
    console.log('server started');
})