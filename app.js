const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

mongoose.connect(DB_URL);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.post('/signin', login);
app.post('/signup', createUser);

app.auth(auth);
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
