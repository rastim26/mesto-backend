const router = require('express').Router();
const { likeCard, dislikeCard } = require('../models/card');
const Card = require('../models/card');

router.get('/', (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
  .catch(err => res.status(500).send({ message: err }));
})

router.post('/', (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
  .catch(err => res.status(500).send({ message: err }));

  res.send(
    `<html>
    <body>
    ${JSON.stringify(req.body)}
      <p>The document has been created!</p>
    </body>
    </html>`
  );
});

router.delete('/:cardId', (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({ data: card}))
  .catch(err => res.status(500).send({ message: err }));

  res.send(
    `<html>
    <body>
    ${JSON.stringify(req.body)}
      <p>The document has been removed!</p>
    </body>
    </html>`
  );
});

router.put('/:cardId/likes', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then(card => res.send({ data: req.params}))
  .catch(err => res.status(500).send({ message: err }));
});

router.delete('/:cardId/likes', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then(card => res.send({ data: req.params}))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка'}));
});

// router.delete('/:cardId/likes', dislikeCard);

module.exports = router;