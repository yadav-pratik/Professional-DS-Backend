const express = require('express')

const userController = require('../app/controllers/userController')

const router = express.Router()

//user apis

router.post('/api/user/register', userController.register)
// router.get('/api/user/account', userController.account)

module.exports = router