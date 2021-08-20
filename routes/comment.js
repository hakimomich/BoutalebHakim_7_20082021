const express = require('express');

const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, commentCtrl.addComment);
router.put('/:id', auth, multer, commentCtrl.updateComment);
router.delete('/:id', auth, multer, commentCtrl.deleteComment);
router.get('/:id', auth, multer, commentCtrl.getOneComment);
router.get('/', auth, multer, commentCtrl.getAllComment);

module.exports = router;