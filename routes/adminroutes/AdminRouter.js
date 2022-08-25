const express= require("express");
const router=express.Router();
const auth=require("../../authentication/AdminAuth");

const adminController=require("../../controller/admincontroller/AdminController.js");

router.get("/",adminController.loginpage);
router.post("/login",adminController.loginpost);

router.get("/allcustomerlist",adminController.allCustomerListPage);
router.get("/dashboard",auth.isAuth,adminController.dashboardPage);

router.get("/customersupport",auth.isAuth,adminController.customerSupport);
router.get("/verify",auth.isAuth,adminController.Verify);


module.exports =router;