const express= require("express");
const router=express.Router();
const auth=require("../authentication/CustomerAuth");

const wishlistController=require("../controller/WishListController.js");

router.get("/addwishlist/:pro_id",auth.isAuth,wishlistController.addWishList);
router.get("/allwishlist",auth.isAuth,wishlistController.allWishList);
router.get("/removewishlist/:pro_id",auth.isAuth,wishlistController.removeWishlist);


module.exports =router;