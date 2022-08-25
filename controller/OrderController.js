const OrderDetail= require("../model/OrderDetail");


exports.orderplacedPost=(request,response)=>{
    
    var date=new Date();
    ord_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    var orderDetail=new OrderDetail(request.session.user_identity,
        request.params.address,
        request.params.contact,
        ord_date,
        request.params.email,
        request.params.itemlist
        );
    orderDetail.saveDetails()
    .then((result)=>{
        response.redirect("/");
    })
    .catch((error)=>{
        console.log(error);
    });
}

exports.adminOrder=(request,response)=>{
    OrderDetail.allAdminOrder()
    .then((result)=>{
        response.render("./admin/AllOrder.ejs",{result});
    })
    .catch((error)=>{

    });
}

exports.customerOrder=(request,response)=>{
    OrderDetail.allCustomerOrder(request.session.user_identity)
    .then((result)=>{
        response.render("./customer/AllOrder.ejs",{result});
    })
    .catch((error)=>{

    });
}

exports.orderdeliver = (request,response)=>{
    console.log(request.params.productId);
    Promise.all([OrderDetail.orderDeliver(request.params.email,request.params.orderProductId,request.params.qty),OrderDetail.decreaseProductQty(request.params.productId)])
    .then((result)=>{
        response.send("Delivery Success And Product Also Update....");
    })
    .catch((error)=>{
        console.log(error);
    });
}


exports.removeOrder=(request,response)=>{
    OrderDetail.removeOrder(request.params.orderId)
    .then((result)=>{
        response.render("./admin/Dashboard.ejs");
    })
    .catch((error)=>{

    });
}