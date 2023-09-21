const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
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
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new NotFoundError('Запрашиваемая запись не найдена'))
    .then((card) => {
      if (userId !== card.owner) throw new UnauthorizedError('У вас недостаточно прав');
      Card.findByIdAndRemove(cardId)
        .then(() => res.send({ data: card }));
    })
    .catch(next);
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
