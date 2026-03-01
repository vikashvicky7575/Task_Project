const express = require('express');
//destructed register & login in controllers
const {register,login} = require("../controllers/authController");
//router using express
const router = express.Router();

//register Router
router.post('/register',register);

//login Router
router.post('/login',login);

module.exports = router;
