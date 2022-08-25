const res = require("express/lib/response");
const Customer = require("../model/Customer");

exports.registerPost=(request,response) => {
    var customer = new Customer(request.body.name,request.body.email,request.body.mobile,request.body.address,request.body.gender,request.body.password);
    customer.customerRegister()
    .then((result) => {
        customer.customerLogin()
        .then((result) => {
            request.session.user_identity = result[0].id;
            response.redirect("/");
    })
    .catch((error) => {

    });
    });
};

exports.registerPage=(request,response) => {
    response.render("./customer/register.ejs",{userLogin:request.session.user_identity});
};

exports.loginPost=(request,response) => {
    var customer = new Customer();
    customer.email=request.body.email;
    customer.password=request.body.password;
    customer.customerLogin()
    .then((result) => {
            request.session.user_identity = result[0].id;
            response.redirect("/");
    })
    .catch((error) => {

    });
};

exports.loginPage=(request,response) => {
    response.render("./customer/login.ejs",{userLogin:request.session.user_identity});
};

exports.logoutUser=(request,response) => {
    request.session.user_identity = "";
    request.session.destroy();
    response.redirect("/");
}