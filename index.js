const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config();
const RestaurantModel = require("./src/app/models/RestaurantModel");

// testing purpose
const amqp_connection_string = "amqps://vpcafnvn:IZKTpMMbAzj-anWfqkEWM0N47tWXvxKo@elk.rmq2.cloudamqp.com/vpcafnvn";
const amqp_task_queue_str = "rating_post";
// end testing purpose
let open = require('amqplib').connect(amqp_connection_string);
// import database
const db = require("./src/app/config/database");

//import routes
const Restaurant = require("./src/app/routes/restaurant");

//import ampq consumer 



const app = express();
app.use(morgan("dev"))
app.use(express.json());

app.set('port', process.env.port);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection 
db.authenticate()
    .then(() => {
        console.log("Database Handshake successfull")
    }).catch((error) => {
        console.log("Database Handshake failed with error :" + error)
    });

open.then(function (conn) {
    return conn.createChannel();
}).then(function (ch) {
    return ch.assertQueue(amqp_task_queue_str).then(function (ok) {
        return ch.consume(amqp_task_queue_str, async function (msg) {
            if (msg !== null) {
                console.log(JSON.parse(msg.content), "everything is fine");
                let rating_restaurant = [];
                let data = JSON.parse(msg.content);
                let restaurantDetail = await RestaurantModel.findOne({ where: { id: data.userRating.restaurantId } });
                rating_restaurant.push(restaurantDetail.rating);
                rating_restaurant.push(data.userRating.rating);
                let sumRating = rating_restaurant.reduce((acc,rate)=>acc+rate,0);
                let ratingCalculation = sumRating/rating_restaurant.length
                let averageRating = ratingCalculation.toFixed(1)
                await RestaurantModel.update({rating:averageRating},{where:{id:data.userRating.restaurantId}})
                ch.ack(msg);
            }
        });
    });
}).catch(console.warn);


app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to restaurant service microservices" });
});

app.get("/restaurant-management", (req, res) => {
    res.json({ message: "Welcome to restaurant service microservices" });
});

app.use("/restaurant-management", Restaurant);

app.get("*", (req, res) => {
    res.status(404).send("Invalid Endpoint")
});






module.exports = app;