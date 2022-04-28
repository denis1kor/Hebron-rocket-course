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
    if(userIndex < usersList.length){
        const usersId = usersList[userIndex-1].id;
        const usersName = usersList[userIndex-1].name;
        res.render('oneOfUsers', {usersId, usersName});
    }else{
        res.write('This user does not exist');
        res.end();
    }
})

app.get('/cars/:carIndex', (req, res) => {
    const {carIndex} = req.params;
    if(carIndex < usersList.length){
        const carTitle = carsList[carIndex-1].title;
        res.render('oneOfCars', {carTitle});
    }
    else{
        res.write('This car does not exist');
        res.end();
    }
})

app.get('/cars', (req, res) => {
    res.render('cars', {carsList})
})

app.listen(5000, () => {
    console.log('server started');
})