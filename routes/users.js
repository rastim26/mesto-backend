const router = require('express').Router();
const {
  getUsers, getUserInfo, createUser,
  updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUserInfo);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
