const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, userCtrl.addUser);
router.put('/:id', auth, multer, userCtrl.updateUser);
router.delete('/:id', auth, multer, userCtrl.deleteUser);
router.get('/:id', auth, multer, userCtrl.getOneUser);
router.get('/', auth, multer, userCtrl.getAllUser);

module.exports = router;