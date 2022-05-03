const DB = require('../dataBase/cars');

module.exports = {
    getAllCars: (req, res) => {
        res.render('cars', {DB});
    },

    createCar: (req, res) => {
        DB.push(req.body);

        res.render('cars', {DB});
    },

    getCarById: (req, res) => {
        const {carsIndex} = req.params;
        const car = DB[carsIndex];

        if(!car){
            return res.sendStatus(404);
        };

        const carTitle = car.title;
        res.render('oneOfCars', {carTitle});
    },

    deleteCar: (req,res) =>{
        const {carsIndex} = req.params;
        const car = DB[carsIndex];

        if(!car){
            return res.sendStatus(404);
        }

        res.send(`${car.title} was deleted`);
    }
};