const User = require('../models/user');

const errorMsg = {
  ValidationError: 'Переданы некорректные данные',
  CastError: 'Запрашиваемая запись не найдена',
  500: 'Произошла ошибка',
};

const errorHandler = (err, res) => {
  if (err.name === 'ValidationError') return res.status(400).send({ message: errorMsg[err.name] });
  if (err.name === 'CastError') return res.status(404).send({ message: errorMsg[err.name] });

  return res.status(500).send({ message: errorMsg[500] });
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => errorHandler(err, res));
};

const getUserInfo = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(err, res));
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(err, res));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(err, res));
};

module.exports = {
  getUsers, getUserInfo, createUser, updateUserInfo, updateUserAvatar,
};
