const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  addNewUser,
  // editUser,
  deleteUser
} = require('../controllers/user.controllers');

router.get('/getAllUsers', getAllUsers);
router.post('/addNewUser', addNewUser);
// router.put('/editUser', editUser);
router.delete('/deleteUser',deleteUser);

module.exports = router;