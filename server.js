const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");

const serverConfigs = require("./configs/server.configs");
const dbConfigs = require("./configs/db.configs");
const User = require("./models/user.model");

//Bosyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(dbConfigs.DB_URL);
const db = mongoose.connection;
db.on("error", ()=>{
    console.log("Error while connecting to the DB");
});
db.once("open", ()=>{
    console.log("Connected to DB successfully");
    
});

//To connect with the server
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.listen(serverConfigs.PORT, ()=>{
    console.log("Server is running at PORT : ",serverConfigs.PORT);
});

