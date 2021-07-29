const Sequelize = require("sequelize");
const db = require("../config/database");
const restaurantCusineType = require("../domain/enumerations/restaurantCusineType");
const restaurantStatus = require("../domain/enumerations/restaurantStatus");


const RestaurantModel = db.define('restaurant', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: restaurantStatus.Active
    },
    cusine:{
        type:Sequelize.STRING,
        defaultValue:restaurantCusineType.NON_VEG
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    }
}, {
    freezeTableName: true
});

module.exports = RestaurantModel;
