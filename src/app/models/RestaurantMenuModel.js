const Sequelize = require("sequelize");
const db = require("../config/database");
const restaurantCusineType = require("../domain/enumerations/restaurantCusineType");
const restaurantStatus = require("../domain/enumerations/restaurantStatus");


const RestaurantMenuModel = db.define('restaurantMenu', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dish: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price:{
        type:Sequelize.INTEGER
    },
    dishType:{
        type:Sequelize.STRING,
        defaultValue:restaurantCusineType.VEG
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: restaurantStatus.Active
    }
}, {
    freezeTableName: true
});

module.exports = RestaurantMenuModel;
