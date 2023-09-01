const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  User.find({});
  res.send(
    `<html>
    <body>
        <p>Ответ на сигнал из далёкого космоса</p>
    </body>
    </html>`
  );
});

router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: req.params}))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка'}));
});

router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then(user => res.send({ data: user }))
    // данные не записались, вернём ошибку
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

router.patch('/me', (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about })
    .then(user => res.send({ data: user}))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка'}));

  res.send(
    `<html>
    <body>
    ${JSON.stringify(req.body)}
    ${JSON.stringify(res.data)}
      <p>The document has been updated!</p>
    </body>
    </html>`
  );
});

router.patch('/me/avatar', (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar })
    .then(user => res.send(`<html>
    <body>
    ${JSON.stringify(req.user._id)}
    ${JSON.stringify(req.body)}
    ${JSON.stringify(user)}
      <p>The avatar has been updated!</p>
    </body>
    </html>`))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка'}));

})

module.exports = router;