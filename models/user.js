const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const UnauthorizedError = require('../errors/unauthorized-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: [false, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    required: [false, 'Поле "about" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Максимальная длина поля "about" - 30'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: [false, 'Поле "avatar" должно быть заполнено'],
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator: (v) => /^https?:\/\/w{0,3}\.?[\w-]+\.\w{1,3}[\w\-._~:\/?#[\]@!$&'()*+,;=]*#?$/.test(v),
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
    minlength: [4, 'Минимальная длина поля "about" - 4'],
    maxlength: [8, 'Максимальная длина поля "about" - 8'],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Неправильные почта или пароль'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .orFail(new UnauthorizedError('Неправильные почта или пароль'))
        .then(user);
    });
};

module.exports = mongoose.model('user', userSchema);
