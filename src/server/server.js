const {MONGO_URI, PORT} = require('./constans/constans.js');

const express = require('express');
const bodyParser = require('body-parser');

const todoitem = require('./routes/todoitem.route'); // Imports routes for the products
const user = require('./routes/user.route'); // Imports routes for the products
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
//let dev_db_url = "mongodb://todo-user:user@localhost:27017/todo_database";
let mongooseOptions = {  useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(MONGO_URI, mongooseOptions);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//setiing connection
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    next();
});

app.use('/todoitem', todoitem);
app.use('/user', user);
//let port = 1234;




app.listen(PORT, () => {
    console.log('Server is up and running on port numner ' + PORT);
});