var express = require('express');
var router = express.Router();
const diaryController = require('../controllers/diaryController');

router.get('/', diaryController.getAllDiarys );

router.get('/:id', diaryController.getDiaryById );

router.post('/create', diaryController.createDiary );

router.put('/:id', diaryController.updateDiary );

router.delete('/:id', diaryController.deleteDiary )

module.exports = router;
