const router = require('express').Router();
const Card = require('../models/card');

router.get('/cards', (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err }));
})

router.post('/cards', (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
  .then(card => res.send({ data: card }))
  .catch(err => res.status(500).send({ message: err }));

  res.send(
    `<html>
    <body>
    ${name}
    ${link}
    ${JSON.stringify(req.body)}
          <p>The document has been created!</p>
    </body>
    </html>`
  );
})