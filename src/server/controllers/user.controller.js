//const {JWT_SECRET} from '../constans/constans.js'
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../constans/constans.js')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
//contollers for user
const User = require('../models/user.model.js');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
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
    
    // TODO: либо callback либо async/await
    
    
    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })
    console.log(user);
    await user.save()
    
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
  
      res.json({ token})
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }