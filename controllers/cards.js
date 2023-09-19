const NotFoundError = require('../errors/not-found-err');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(new NotFoundError('Запрашиваемая запись не найдена'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => res.status(201).send({ data: cards }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.body;
  if (_id === cardId) {
    Card.findByIdAndRemove(req.params.cardId)
      .orFail(new NotFoundError('Запрашиваемая запись не найдена'))
      .then((card) => res.send({ data: card }))
      .catch(next);
  }
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFoundError('Запрашиваемая запись не найдена'))
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError('Запрашиваемая запись не найдена'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
