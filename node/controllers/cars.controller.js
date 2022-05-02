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
            res.sendStatus(404);
            return;
        }

        const carTitle = car.title
        res.render('oneOfCars', {carTitle})
    }
}