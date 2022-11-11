const express = require('express');
const studentControler = require('../controlers/studentControler')
const router = express.Router()


router.get('/', studentControler.getAllStd);
router.get('/:std_id', studentControler.getStdById);
router.post('/', studentControler.addStd);
router.patch('/:std_id', studentControler.updateStd);
router.delete('/:std_id', studentControler.deleteStd);

module.exports = router