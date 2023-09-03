const Card = require('../models/card');
const { errorHandler } = require('../utils/utils');

const getCards = (req, res) => {
  Card.find({})
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      errorHandler(err, res);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => res.status(201).send({ data: cards }))
    .catch((err) => {
      errorHandler(err, res);
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      errorHandler(err, res);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      errorHandler(err, res);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      errorHandler(err, res);
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
