const express= require("express");
const router=express.Router();

const queryController=require("../controller/QueryController.js");


router.post("/customerquery",queryController.queryPost)

module.exports =router;