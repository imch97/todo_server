//const {JWT_SECRET} from '../constans/constans.js'
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../constans/constans.js')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
//contollers for user
const User = require('../models/user.model.js');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};



exports.user_create = function (req, res) {
    let user = new User(
        {
            //name: req.body.name,
            email: req.body.login,
            password: req.body.password,
        }, 
        console.log("Create user")       
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
        console.log("Save new user") 
    })
};

exports.user_details = function (req, res) {
    User.findById(req.body.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
    console.log("Show details user") 
};

exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.body.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('User udpated.', req.body.id);
        console.log("Update user") 
    });
};


exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.body.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
        console.log("Delete user ", req.body.id) 
    })
};



exports.register = async function (req, res){  
        
   try { 
    
    const errors = validationResult(req)  
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при регистрации'
      })
    }

    const {email, password} = req.body
    
    const candidate = await User.findOne({ email })
    
    
    
    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })
    console.log(user);
    await user.save()
    console.log('END');
    res.status(201).json({ message: 'Пользователь создан' })

  } catch (e) {
    console.log(e);
    
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}


exports.login = async function (req, res) {    
    
    try {
      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему'
        })
      }
  
      const {email, password} = req.body
  
      const user = await User.findOne({ email })
  
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }
  
      const isMatch = await bcrypt.compare(password, user.password)
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }
  
      const token = jwt.sign(
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: '1h' }
      )
  
      res.json({ token, userId: user.id })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }