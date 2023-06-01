const express = require('express');
const { generateImage,generateAiImage,uploadimage } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generateimage', generateImage);
router.post('/generateAiImage', generateAiImage);
router.post("/upload",uploadimage);
module.exports = router;
