const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const { uploadImage, removeImage } = require('../controllers/cloudinary');

const router = express.Router();

router.post('/uploadimage', authCheck, adminCheck, uploadImage);
router.post('/removeimage', authCheck, adminCheck, removeImage);

module.exports = router;
