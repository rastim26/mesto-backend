const router = require('express').Router();
const bodyParser = require('body-parser');

const User = require('../models/user');

router.get('/user', (req, res) => {
  User.find({});
  res.send(
    `<html>
    <body>
        <p>Ответ на сигнал из далёкого космоса</p>
    </body>
    </html>`
  );
});

router.get('/users/:userId', (req, res) => {
  User.finfById(req.params._id)
    .then(user => res.send({ data: user}))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка'}));
});

router.post('/users', (req, res) => {
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

module.exports = router;