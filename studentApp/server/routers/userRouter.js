const express = require('express');
const userControler = require('../controlers/userControler')
const router = express.Router()

router.get('/:user_id', userControler.getUser);
router.post('/', userControler.addUser);
router.post('/login', userControler.login);

module.exports = router