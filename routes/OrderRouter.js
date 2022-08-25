const orderController=require("../controller/OrderController");
const express = require("express");
const router = express.Router();

router.get("/orderplaced/:itemlist/:address/:contact/:email",orderController.orderplacedPost);
router.get("/adminorder",orderController.adminOrder);
router.get("/customerorder",orderController.customerOrder);
router.get("/orderdeliver/:qty/:email/:orderProductId/:productId",orderController.orderdeliver);
router.get("/removeorder/:orderId",orderController.removeOrder);

module.exports =router;