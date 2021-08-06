const RestaurantModel = require('../models/RestaurantModel');
const RestaurantMenuModel = require('../models/RestaurantMenuModel');
const restaurantCustomMessages = require('../domain/customMessages/restaurant');
const restaurantStatus = require('../domain/enumerations/restaurantStatus');
const apiResponse = require('../helpers/apiResponse');
const { Op } = require('sequelize');
const logger = require('../utils/logger');




exports.getAllRestaurant = async (pageSize, pageIndex, sortingKey, sortingPriority, searchKey) => {
    try {
        let order = [[sortingKey, sortingPriority]];
        let paginate = {
            offset: (pageIndex - 1) * pageSize,
            limit: pageSize,
        }
        const searchQuery = getSearchQuery(searchKey);
        const combinedSearchQuery = {
            where: searchKey ? { [Op.or]: searchQuery } : {},
            include: [
                {
                    model: RestaurantMenuModel,
                    as: "restaurantMenuMaps"
                }
            ],
            distinct: true,
            ...paginate,
            order
        };
        const restaurants = await RestaurantModel.findAndCountAll(combinedSearchQuery);
        const paginateData = searchKey ? {} : {
            totalCount: restaurants.count,
            totalPages: Math.ceil(restaurants.count / pageSize),
            pageSize,
            pageIndex
        }
        if (restaurants.rows.length > 0) {
            return { response: restaurants.rows, "paginateData": paginateData }
        } else {
            throw new Error("Restaurants records not found")
        }
    } catch (error) {
        throw error;
    }
}

exports.getSingleRestaurant = async (restaurantId) => {
    try {
        const restaurant = await RestaurantModel.findOne(
            {
                where: {
                    "id": restaurantId,
                    "status": restaurantStatus.Active
                },
                include: [
                    {
                        model: RestaurantMenuModel, as: "restaurantMenuMaps"
                    }
                ]
            });
        if (restaurant) {
            return restaurant;
        } else {
            throw new Error(restaurantCustomMessages.errorMessages.RESTAURANT_RECORDS_NOT_FOUND)
        }
    } catch (error) {
        throw error;
    }
}

exports.createRestaurant = async (body) => {
    try {
        const restaurant = await RestaurantModel.findOne({ where: { email: body.email, status: restaurantStatus.Active } });
        if (restaurant) {
            throw new Error(restaurantCustomMessages.errorMessages.RESTAURANT_RECORDS_ALREADY_EXISTED);
        } else {
            const newRestaurant = await RestaurantModel.create(body);
            const newRestaurantMenu = await RestaurantMenuModel.bulkCreate(body.menu, { returning: true });
            if (newRestaurant && newRestaurantMenu) {
                await newRestaurant.setRestaurantMenuMaps(newRestaurantMenu);
                return newRestaurant;
            } else {
                throw new Error(restaurantCustomMessages.errorMessages.FAILED_CREATE_RESTAURANT_RECORDS);
            }
        }

    } catch (error) {
        throw error;
    }
}

exports.updateRestaurant = async (body, restaurantId) => {
    try {
        const restaurant = await RestaurantModel.findOne({ where: { id: restaurantId, status: restaurantStatus.Active } });
        if (restaurant) {
            const updateRestaurant = await RestaurantModel.update(body, { where: { "id": restaurantId } });
            if (updateRestaurant[0] === 1) {
                return true
            } else {
                throw new Error(restaurantCustomMessages.errorMessages.FAILED_UPDATE_RESTAURANT_RECORDS)
            }
        } else {
            throw new Error(restaurantCustomMessages.errorMessages.RESTAURANT_RECORDS_NOT_FOUND)
        }

    } catch (error) {
        throw error;
    }

}

exports.updateRestaurantMenu = async (body, restaurantId, restaurantMenuId) => {
    try {
        const restaurant = await RestaurantModel.findOne({ where: { id: restaurantId, status: restaurantStatus.Active } });
        if (restaurant) {
            const restaurantMenu = await RestaurantMenuModel.findOne({ where: { id: restaurantMenuId, restaurantId: restaurantId, status: restaurantStatus.Active } });
            if (restaurantMenu) {
                const updateRestaurantMenu = await RestaurantMenuModel.update(body, { where: { id: restaurantMenuId } })
                if (updateRestaurantMenu[0] === 1) {
                    return true
                } else {
                    throw new Error(restaurantCustomMessages.errorMessages.FAILED_UPDATE_RESTAURANT_MENU_RECORDS)
                }
            } else {
                throw new Error(restaurantCustomMessages.errorMessages.RESTAURANT_MENU_RECORDS_NOT_FOUND)
            }
        } else {
            throw new Error(restaurantCustomMessages.errorMessages.RESTAURANT_RECORDS_NOT_FOUND)
        }
    } catch (error) {
        throw error;
    }
}

exports.updateRestaurantStatus = async (body, restaurantId) => {
    try {
        const restaurant = await RestaurantModel.findOne({ where: { id: restaurantId } });
        if (restaurant) {
            const updateRestaurantStatus = await RestaurantModel.update({ status: body.status }, { where: { id: restaurantId } });
            if (updateRestaurantStatus[0] === 1) {
                return true;
            } else {
                throw new Error(restaurantCustomMessages.errorMessages.FAILED_UPDATE_RESTAURANT_RECORDS);
            }
        } else {
            throw new Error(restaurantCustomMessages.errorMessages.RESTAURANT_RECORDS_NOT_FOUND);
        }
    } catch (error) {
        throw error;
    }
}

exports.updateRestaurantMenuStatus = async (body, restaurantMenuId) => {
    try {
        const restaurantMenu = await RestaurantMenuModel.findOne({ where: { id: restaurantMenuId } });
        if (restaurantMenu) {
            const updateRestaurantMenuStatus = await RestaurantMenuModel.update({ status: body.status }, { where: { id: restaurantMenuId } })
            if (updateRestaurantMenuStatus[0] === 1) {
                return true;
            } else {
                throw new Error(restaurantCustomMessages.errorMessages.FAILED_UPDATE_RESTAURANT_MENU_RECORDS)
            }
        } else {
            throw new Error(restaurantCustomMessages.errorMessages.RESTAURANT_MENU_RECORDS_NOT_FOUND)
        }

    } catch (error) {
        throw error;
    }
}

exports.deleteRestaurant = async (restaurantId) => {
    try {
        await RestaurantModel.destroy({ where: { id: restaurantId } })
        return true
    } catch (error) {
        throw error
    }
}

const getSearchQuery = (searchKey) => {
    const searchQuery = { [Op.iLike]: "%" + searchKey + "%" };
    const queries = [
        { name: searchQuery },
        { cusine: searchQuery },
        { rating: searchQuery },
        { "$restaurantMenuMaps.name$": searchQuery }
    ];

    return queries;
}