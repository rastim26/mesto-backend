const { celebrate, Joi } = require('celebrate');

const urlPattern = /^https?:\/\/w{0,3}\.?[\w-]+\.\w{1,3}[\w\-._~:\/?#[\]@!$&'()*+,;=]*#?$/;

const validateSigninFields = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(4),
  }),
});

const validateSignupFields = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string().required().min(4),
  }),
});

const validateCardFields = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlPattern),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const validateUserFields = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlPattern),
  }),
});

module.exports = {
  validateSigninFields,
  validateSignupFields,
  validateCardFields,
  validateCardId,
  validateUserId,
  validateUserFields,
  validateAvatar,
};
