const express = require('express')

const userController = require('../app/controllers/userController')
const serviceController = require('../app/controllers/serviceController')

const authenticatUser = require('../app/middlewares/authentication')

const router = express.Router()

//user apis

router.post('/api/user/register', userController.register)
router.post('/api/user/login', userController.login)
router.get('/api/user/account', authenticatUser, userController.account)

//service apis

router.post('/api/service/create', authenticatUser, serviceController.create)
// router.get('/api/service/show', serviceController.show)

module.exports = router