const express = require('express');
const router = express.Router();

const categoryController=require('../controller/CategoryController');

router.get("/allcategory",categoryController.getAllCategory);
router.get("/shopnow/:cat_id",categoryController.allProductByCategoryId);

module.exports =router;