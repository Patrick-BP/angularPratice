const express = require('express');
const studentControler = require('../controlers/studentControler')
const multer = require('multer');
const upload = multer({dest: 'uploads/'})
const router = express.Router()


router.get('/', studentControler.getAllStd);
router.get('/:std_id', studentControler.getStdById);
router.post('/',upload.single('avatar'), studentControler.addStd);
router.patch('/:std_id', studentControler.updateStd);
router.delete('/:std_id', studentControler.deleteStd);

module.exports = router