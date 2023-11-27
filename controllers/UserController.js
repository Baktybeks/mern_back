require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../models');

const token = (id) => jwt.sign(
  { _id: id },
  process.env.SECRET_KEY,
  { expiresIn: '24h' }
);

const register = async(req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash
    });
    const user = await doc.save();
    const { passwordHash, ...userData } = user._doc;
    res.json({ userData, token: token(user._id) });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось зарегаться'
    });
  }
};

const login = async(req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log('useruser', user);
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден'
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль'
      });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json({ userData, token: token(user._id) });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось авторизоваться '
    });
  }
};

const getMe = async(req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json({ userData, token: token(user._id) });

  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа'
    });
  }
};

module.exports = {
  register,
  login,
  getMe
};