const express=require('express');
const router=express.Router();

const indexController=require('../controller/IndexController');

router.get("/", indexController.homePage);
router.get("/contact", indexController.contactPage);
router.get("/about", indexController.aboutPage);

module.exports=router;