const Product=require("../model/Product");

exports.homePage=(request,response)=>{

    var userLoginCheck=request.session.user_identity;

    // Promise.all([Product.fetchAllProduct(request.session.user_identity),Product.fetchLikeUnlike(request.session.user_identity)])
        Product.fetchAllProduct(request.session.user_identity).then((result)=>{
        response.render("./customer/index.ejs",{result,userLogin:userLoginCheck});
    })
    .catch((error)=>{
        console.log("Error............................."+error);
    });
    
    Product.fetchAllProduct(request.session.user_identity)
    .then(results=>{
        response.render("./customer/index.ejs",{result:results,userLogin:userLoginCheck});
    })
    .catch();
    
};

exports.aboutPage=(request,response)=>{
    response.render("./customer/AboutUs.ejs",{userLogin:request.session.user_identity});
}

exports.contactPage=(request,response)=>{
    response.render("./customer/ContactUs.ejs",{userLogin:request.session.user_identity});
}