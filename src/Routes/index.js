const express = require('express')

const router = express.Router();

const {
HomePageController,
SignInController,
SignUpController
}=require('../Controllers/UserController')

router.get('/',HomePageController)
router.post('/signin',SignInController)
router.post('/signup',SignUpController)

module.exports = router