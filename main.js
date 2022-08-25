//basic packages
const express= require("express");
const app = express();
const bodyParser=require("body-parser");
const path = require("path");
var session = require('express-session')


//routes package
const adminRouter=require("./routes/adminroutes/AdminRouter.js");
const indexRouter=require("./routes/IndexRouter");
const customerRouter=require("./routes/CustomerRouter");
const cartRouter=require("./routes/CartRouter");
const categoryRouter=require("./routes/CategoryRouter");
const wishlistRouter=require("./routes/WishListRouter");
const queryRouter=require("./routes/QueryRouter");
const orderRouter=require("./routes/OrderRouter");

//bodyParser and static file and ejs tetmplate engine
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({
    secret: 'geekhardware'
  }))

//adminroutes and userroutes
app.use("/order",orderRouter);
app.use("/customer",customerRouter);
app.use("/query",queryRouter);
app.use("/wishlist",wishlistRouter);
app.use("/category",categoryRouter);
app.use("/cart",cartRouter);
app.use("/admin",adminRouter);
app.use("/",indexRouter);

app.listen(3000,()=>{
    console.log("Server Start At Port : "+3000);
});

