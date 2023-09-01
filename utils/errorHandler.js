module.exports.errorMsg = {
  ValidationError: 'Переданы некорректные данные',
  CastError: 'Запрашиваемая запись не найдена',
  '500': 'Произошла ошибка'
}

const errorHandler = (err, res) => {
  if(err.name === 'ValidationError') return res.status(400).send({ message: errorMsg[err.name]});
  if(err.name === 'CastError') return res.status(404).send({ message: errorMsg[err.name]});

  res.status(500).send({ message: errorMsg[500]});
};

// Doesn't work