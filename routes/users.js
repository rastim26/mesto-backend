const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserInfo,
  updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alfanum().length(24),
  }),
}), getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
  user: Joi.object().keys({
    _id: Joi.string().required().alfanum().length(24),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().domain(),
  }),
  user: Joi.object().keys({
    _id: Joi.string().required().alfanum().length(24),
  }),
}), updateUserAvatar);

module.exports = router;
