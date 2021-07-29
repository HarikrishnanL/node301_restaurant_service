const express  = require('express');
const router = express.Router();

//import controller
const restaurantController = require('../controllers/restaurantController');

//import session validator
const authSessionValidator = require('../utils/sessionValidatorUtils');

// CRUD restaurant routes
router.post('/restaurant',authSessionValidator.adminSessionAuthValidator,restaurantController.createRestaurant);

router.get('/restaurant/:restaurantId',authSessionValidator.sessionAuthValidator,restaurantController.getSingleRestaurant);

router.put('/restaurant/:restaurantId',authSessionValidator.adminSessionAuthValidator,restaurantController.updateRestaurant);

router.put('/restaurant/:restaurantId/menu/:restaurantMenuId',authSessionValidator.adminSessionAuthValidator,restaurantController.updateRestaurantMenu);

router.patch('/restaurant/:restaurantId',authSessionValidator.adminSessionAuthValidator,restaurantController.updateRestaurantStatus);

router.patch('/restaurant/:restaurantId/menu/:restaurantMenuId',authSessionValidator.adminSessionAuthValidator,restaurantController.updateRestaurantMenuStatus);

router.delete('restaurant/:restaurantId',authSessionValidator.adminSessionAuthValidator,restaurantController.deleteRestaurant);




module.exports = router;
