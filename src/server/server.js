const express = require('express');
const bodyParser = require('body-parser');

const todoitem = require('./routes/todoitem.route'); // Imports routes for the products
const user = require('./routes/user.route'); // Imports routes for the products
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
//let dev_db_url = "mongodb://localhost:27017/todo_database";
let dev_db_url = "mongodb://todo-user:user@localhost:27017/todo_database";
//const mongoDB = process.env.MONGODB_URI || dev_db_url;
let mongooseOptions = {  useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(dev_db_url, mongooseOptions);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/todoitem', todoitem);
app.use('/user', user);
let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});