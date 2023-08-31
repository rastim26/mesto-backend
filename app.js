const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', require('./routes/users.js'));
app.use('/', require('./routes/cards.js'));

app.use((req, res, next) => {
  req.user = {
    _id: '64f0c0e77c29968ae4b1b72b'
  };
  next();
});


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