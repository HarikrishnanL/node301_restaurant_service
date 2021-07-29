const restaurantService = require("../services/restaurantService");
const apiResponse = require("../helpers/apiResponse");
const restaurantCustomMessages = require("../domain/customMessages/restaurant");


exports.createRestaurant = async (req, res) => {
    try {
        const newRestaurant = await restaurantService.createRestaurant(req.body);
        return apiResponse.successResponseWithData(res, restaurantCustomMessages.successMessages.RESTAURANT_RECORDS_CREATED, { id: newRestaurant.id, name: newRestaurant.name });

    } catch (error) {
        return apiResponse.errorResponse(res, error.message);
    }
}

exports.getSingleRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurantService.getSingleRestaurant(req.params.restaurantId);
        return apiResponse.successResponseWithData(res, restaurantCustomMessages.successMessages.RECORDS_FOUND, restaurant)

    } catch (error) {
        return apiResponse.errorResponse(res, error.message);
    }
}

exports.updateRestaurant = async (req, res) => {
    try {
        await restaurantService.updateRestaurant(req.body, req.params.restaurantId);
        return apiResponse.successResponse(res, "Restaurant Records updated");
    } catch (error) {
        return apiResponse.errorResponse(res, error.message);
    }
}

exports.updateRestaurantMenu = async (req,res)=>{
    try{
        await restaurantService.updateRestaurantMenu(req.body,req.params.restaurantId,req.params.restaurantMenuId);
        return apiResponse.successResponse(res,"Restaurant Menu records updated");
    }catch(error){
        return apiResponse.errorResponse(res, error.message);
    }
} 

exports.updateRestaurantStatus = async (req,res)=>{
    try{
        await restaurantService.updateRestaurantStatus(req.body,req.params.restaurantId);
        return apiResponse.successResponse(res,"Restaurant status updated");

    }catch(error){
        return apiResponse.errorResponse(res, error.message);
    }
}

exports.updateRestaurantMenuStatus = async (req,res)=>{
    try{
        await restaurantService.updateRestaurantMenuStatus(req.body,req.params.restaurantMenuId);
        return apiResponse.successResponse(res,"Restaurant Menu status updated");

    }catch(error){
        return apiResponse.errorResponse(res, error.message);
    }
}

exports.deleteRestaurant = async (req,res)=>{
    try{
        await restaurantService.deleteRestaurant(req.params.restaurantId);
        return apiResponse.successResponse(res,"Restaurant records got deleted ")
    }catch(error){
        return apiResponse.errorResponse(res, error.message);
    }
}
