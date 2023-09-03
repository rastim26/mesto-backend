const User = require('../models/user');
const { errorHandler } = require('../utils/utils');

const getUsers = (req, res) => {
  User.find({})
    .orFail(new Error('NotValidId'))
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      errorHandler(err, res);
    });
};

const getUserInfo = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate(
    { _id: req.user._id },
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      errorHandler(err, res);
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

module.exports = {
  getUsers, getUserInfo, createUser, updateUserInfo, updateUserAvatar,
};
