/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserInfo,
  updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', celebrate({
  body: Joi.object().keys({

  }),
}), getUsers);
router.get('/me', celebrate({
  body: Joi.object().keys({

  }),
}), getUserInfo);
router.get('/:userId', celebrate({
  body: Joi.object().keys({

  }),
}), getUserInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    
  }),
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({

  }),
}), updateUserAvatar);

module.exports = router;
