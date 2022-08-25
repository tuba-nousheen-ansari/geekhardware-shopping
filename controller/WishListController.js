const Product = require("../model/Product");
const WishList=require("../model/WishList");

exports.addWishList = (req, res) =>{
    var wishlist = new WishList(req.session.user_identity,req.params.pro_id);
    wishlist.save()
    .then((result) =>{
        res.redirect("/");
    })
    .catch((err) =>{

    });
}

exports.allWishList = (req, res) =>{

    Promise.all([WishList.allWishlist(req.session.user_identity),Product.fetchAllProduct(req.session.user_identity)])
    .then((result) =>{
        console.log(result[0].length);
        console.log(result[1].length);
        res.render("./customer/Allwishlist.ejs",{result:result[0],likeitem:result[1],userLogin:req.session.user_identity});
    })
    .catch((err) =>{
        console.log(err);
    });
}

exports.removeWishlist= (req, res) =>{
    WishList.remove(req.params.pro_id)
    .then((result) =>{
        res.redirect("/");
    })
    .catch((err) =>{

    });
}