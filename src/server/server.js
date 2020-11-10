const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/todoitem.route'); // Imports routes for the products
const app = express();
app.use('/todoitem', product);
let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});