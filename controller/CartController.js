const Cart = require("../model/Cart");
const Category = require("../model/Category");
exports.addToCartPost=(request,response)=>{
    var cart= new Cart();
    cart.addToCart(request.params.pro_id,request.session.user_identity)
    .then(result=>{
        return response.redirect("/");
    })
    .catch(error=>{
        console.log(error)
    });
}

exports.removeFromCartPost=(request,response)=>{
    var cart= new Cart();
    cart.removeFromCart(request.params.pro_id,request.session.user_identity)
    .then(result=>{
        return response.redirect("/")
    })
    .catch(error=>{
        console.log(error)
    });
}


exports.allCartPage=(request,response)=>{
    
    Cart.allCart(request.session.user_identity)
    .then((result)=>{    
        response.render("./customer/AllAddCart.ejs",{result: result,userLogin:request.session.user_identity});
    })
    .catch((error)=>{
        console.log(error);
    });
}

exports.allcartItemPage=(request,response)=>{
    
    Cart.allCart(request.session.user_identity)
    .then((result)=>{      
        return response.json(result);
    })
    .catch((error)=>{
        console.log(error);
    });
}

exports.allCartRemove=(request,response)=>{
    Cart.removeAllCart(request.session.user_identity)
    .then((result)=>{
        response.redirect("/");
    })
    .catch((error)=>{

    });
}