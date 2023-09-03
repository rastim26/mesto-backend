const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express(DB_URL);

mongoose.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64f1e84f47c84d9cc412b76e',
  };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// app.post('/', (req, res) => {
//   res.send(
//     `<html>
//     <body>
//         ${req.body}
//         ${req.body.name}
//         ${req.body.about}
//         ${req.body.avatar}
//         ${JSON.stringify(req.body)}

//         <p>Ответ на сигнал из далёкого космоса</p>
//     </body>
//     </html>`
//   );
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
