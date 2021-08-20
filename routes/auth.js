const express = require('express');

const router = express.Router();

const authCtrl = require('../controllers/auth');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', auth, multer, authCtrl.signup);
router.post('/login', auth, multer, authCtrl.login);


module.exports = router;