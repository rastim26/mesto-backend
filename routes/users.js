const router = require('express').Router();
const {
  getUsers, getUserInfo,
  updateUserInfo, updateUserAvatar,
} = require('../controllers/users');
const { validateUserId, validateUserFields, validateAvatar } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validateUserId, getUserInfo);
router.patch('/me', validateUserFields, updateUserInfo);
router.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = router;
