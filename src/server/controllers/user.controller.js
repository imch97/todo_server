//contollers for user
const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};



exports.user_create = function (req, res) {
    let user = new User(
        {
            name: req.body.name,
            login: req.body.login,
            password: req.body.password,
        }, 
        console.log("Create user")       
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
    })
};

exports.user_details = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('User udpated.');
    });
};


exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};