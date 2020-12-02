require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const todoitem = require('./routes/todoitem.route')
const user = require('./routes/user.route')
const app = express()
const mongoose = require('mongoose')
const dev_db_url = `mongodb+srv://${process.env.USER_MONGO}:${process.env.PASSWORD_USER_MONGO}@cluster0.lxer2.mongodb.net/${process.env.NAME_DATABASE}?retryWrites=true&w=majority`
//const dev_db_url = `mongodb://${process.env.USER_MONGO}:${process.env.PASSWORD_USER_MONGO}@${process.env.URL_MONGODB}:${process.env.PORT_MONGO}/${process.env.NAME_DATABASE}`
let mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(dev_db_url, mongooseOptions)
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
	next()
})

app.use('/api/todoitem', todoitem)
app.use('/api/user', user)
//--
//app.use('/', express.static(path.join(__dirname, 'build')))
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../../', 'build', 'index.html'))
})

// const buildPath = path.join(__dirname, '..', 'build')
// app.use(express.static(buildPath))

//--
app.listen(process.env.PORT, () => {
	console.log('Server is up and running on port numner ' + process.env.PORT)
})
