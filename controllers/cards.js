const Card = require('../models/card');

const errorMsg = {
  ValidationError: 'Переданы некорректные данные',
  CastError: 'Запрашиваемая запись не найдена',
  '500': 'Произошла ошибка'
}

const errorHandler = (err, res) => {
  if(err.name === 'ValidationError') return res.status(400).send({ message: errorMsg[err.name]});
  if(err.name === 'CastError') return res.status(404).send({ message: errorMsg[err.name]});

  res.status(500).send({ message: errorMsg[500]});
};


const getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card}))
  .catch(err => errorHandler(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
  .then(card => res.send({ data: card}))
  .catch(err => errorHandler(err, res));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
  .then(card => res.send({ data: card}))
  .catch(err => errorHandler(err, res));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
  .then(card => res.send({ data: card}))
  .catch(err => errorHandler(err, res));

};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
  .then(card => res.send({ data: card}))
  .catch(err => errorHandler(err, res));
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
