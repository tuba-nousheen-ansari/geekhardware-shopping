const express = require('express');
const router = express.Router();

const customerController=require('../controller/CustomerController');

router.get("/register", customerController.registerPage);
router.post("/register", customerController.registerPost);

router.get("/login", customerController.loginPage);
router.post("/login", customerController.loginPost);

router.get("/logout", customerController.logoutUser);

module.exports = router;