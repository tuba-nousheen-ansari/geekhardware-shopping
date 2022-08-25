const express=require('express');
const router = express.Router();
const auth = require('../authentication/CustomerAuth');

const cartController = require('../controller/CartController');

router.get("/addtocart/:pro_id",cartController.addToCartPost);
router.get("/removefromcart/:pro_id",cartController.removeFromCartPost);

router.get("/alladdcart",auth.isAuth,cartController.allCartPage);

router.get("/allcartItem",auth.isAuth,cartController.allcartItemPage);
router.get("/allcartremove",cartController.allCartRemove);

module.exports =router;