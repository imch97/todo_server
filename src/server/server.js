const express = require('express');
const bodyParser = require('body-parser');

const product = require('./routes/todoitem.route'); // Imports routes for the products
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = "mongodb://localhost:27017/todo_database";
let mongooseOptions = {  useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(dev_db_url, mongooseOptions);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/todoitem', product);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});