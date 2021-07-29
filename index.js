const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config();

// import database
const db = require("./src/app/config/database");

//import routes
const Restaurant = require("./src/app/routes/restaurant");


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



app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to restaurant service microservices" });
});

app.get("/restaurant-management", (req, res) => {
    res.json({ message: "Welcome to restaurant service microservices" });
});

app.use("/restaurant-management",Restaurant);

app.get("*", (req, res) => {
    res.status(404).send("Invalid Endpoint")
});






module.exports = app;