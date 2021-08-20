const express = require('express');

const router = express.Router();

const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', multer, articleCtrl.addArticle);
router.put('/:id', articleCtrl.updateArticle);
router.delete('/:id', articleCtrl.deleteArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.get('/', articleCtrl.getAllArticle);

module.exports = router;