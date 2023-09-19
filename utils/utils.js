// const errorMsg = {
//   400: 'Переданы некорректные данные',
//   401: 'Неправильные почта или пароль',
//   404: 'Запрашиваемая запись не найдена',
//   500: 'Произошла ошибка',
// };

// module.exports.errorHandler = (err, res) => {
//   if (err.name === ('ValidationError' || 'CastError')) {
//     res.status(400).send({ message: errorMsg[400] });
//     return;
//   }
//   if (err.name === ('Unauthorized')) {
//     res.status(401).send({ message: errorMsg[401] });
//     return;
//   }
//   if (err.message === 'NotValidId') {
//     res.status(404).send({ message: errorMsg[404] });
//     return;
//   }
//   res.status(500).send({ message: errorMsg[500] });
// };
