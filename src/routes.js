const express = require('express');
const routes = express.Router();
const multer = require('multer');
const multerConfig = require('./config/multer.js')


const companyController = require('./controllers/companyController')
const drinkController = require('./controllers/drinkController')
const foodController = require('./controllers/foodController')
const profileController = require('./controllers/profileController')


routes.get('/quemVaiGanhar', (request, response ) => {
    return response.json({'O primeiro lugar já é nosso': true})
});

//Rotas de cadastro e login de usuário 

routes.get('/login', companyController.login);
routes.get('/companyShow', companyController.show);
routes.post('/cadastro', multer(multerConfig).single('file'), companyController.create);


//Rotas referentes às comidas
routes.post('/food', foodController.create);
routes.get('/food', foodController.show);
routes.delete('/food/:id', foodController.delete);


//Rotas referentes às bebidas

routes.post('/drink', drinkController.create);
routes.delete('/drink/:id', drinkController.delete);
routes.get('/drink', drinkController.show);



routes.get('/profile', profileController.index);




module.exports = routes;   