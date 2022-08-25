const Category = require("../model/Category");

exports.getAllCategory=(request,response)=>{
    Category.allCategory()
    .then((result)=>{
        response.render("./customer/AllCategory.ejs",{result:result,userLogin:request.session.user_identity});
    })
    .catch((error)=>{

    });
}

exports.allProductByCategoryId=(request,response) => {
    Category.allProductByCategory(request.params.cat_id)
    .then((result)=>{
        response.render("./customer/AllProductById.ejs",{result,userLogin:request.session.user_identity});
    })
    .catch((error)=>{

    });
}