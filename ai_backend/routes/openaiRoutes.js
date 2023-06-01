const express = require('express');
const { generateImage,generateAiImage } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generateimage', generateImage);
router.post('/generateAiImage', generateAiImage);

module.exports = router;
