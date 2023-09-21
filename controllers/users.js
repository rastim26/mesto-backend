const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const AlreadyExistsError = require('../errors/already-exists-err');

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError('Запрашиваемая запись не найдена'))
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.status(201).send({ message: 'Пользователь добавлен!' }))
    .catch((err) => {
      if (err.code === 11000) return next(new AlreadyExistsError('Данный email уже зарегистрирован!'));
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.params.userId || req.user._id)
    .orFail(new NotFoundError('Запрашиваемая запись не найдена'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Запрашиваемая запись не найдена'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Запрашиваемая запись не найдена'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports = {
  getUsers, login, getUserInfo, createUser, updateUserInfo, updateUserAvatar,
};
