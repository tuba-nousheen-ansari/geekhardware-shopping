const pool=require("../connection/GetConnection");

const nodeMailer=require("nodemailer");
const { response } = require("express");

module.exports=class OrderDetail
{ 
    constructor(cust_id,ord_add,ord_mobile,ord_date,ord_email,order_product)
    { 
        this.cust_id = cust_id;
        this.ord_add = ord_add;
        this.ord_mobile = ord_mobile;
        this.ord_date = ord_date;
        this.ord_email = ord_email;
        this.order_product=JSON.parse(order_product) ;
    }

    saveDetails()
    {
        return new Promise((resolve, reject) =>{
            pool.getConnection((err,connection)=>{
                if(err)
                    return reject(err);
                else
                {
                    let sql="insert into order_detail(cust_id,ord_add,ord_mobile,ord_date,ord_email) values(?,?,?,?,?)";
                    connection.query(sql,[this.cust_id,this.ord_add,this.ord_mobile,this.ord_date,this.ord_email],(err,reult)=>{
                        if(err) 
                            return reject(err);
                        else
                        {
                             sql="select id as ord_id from order_detail where ord_email=?";
                            connection.query(sql,[this.ord_email],(err,result)=>{
                                if(err)
                                    return reject(err);
                                else
                                { 
                                    for(let i=0; i<this.order_product.length; i++)
                                    { 
                                        let totalsum=(this.order_product[i].pro_qty)*(this.order_product[i].pro_price);
                                        sql="insert into order_product(ord_id,pro_id,ord_qty,total_sum) values(?,?,?,?)";
                                        connection.query(sql,[result[0].ord_id,this.order_product[i].pro_id,this.order_product[i].pro_qty,totalsum],(err,result)=>{
                                            if(err) 
                                                return reject(err);
                                            else
                                            {
                                                err?reject(err):resolve(result);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });
        });
    }


    static allAdminOrder()
    { 
        return new Promise((resolve, reject) =>{
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql="select distinct od.id as orderId,od.ord_add as address,od.ord_mobile as mobile,od.ord_date as date,od.ord_email as email,op.id as orderProductId,op.total_sum as sum,op.ord_qty as qty,p.id as productId,p.pro_name as productName,p.pro_price as price from product as p,order_detail as od,order_product as op where od.id=op.ord_id and p.id=op.pro_id";
                    connection.query(sql,(err,res)=>{
                        connection.release();
                        err?reject(err):resolve(res);
                    });
                }
            });
        });
    }

    static allCustomerOrder(custId)
    { 
        return new Promise((resolve, reject) =>{
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql="select distinct od.id as orderId,od.ord_add as address,od.ord_mobile as mobile,od.ord_date as date,od.ord_email as email,op.id as orderProductId,op.total_sum as sum,op.ord_qty as qty,p.id as productId,p.pro_name as productName,p.pro_price as price from product as p,order_detail as od,order_product as op where od.id=op.ord_id and p.id=op.pro_id and od.cust_id=?";
                    connection.query(sql,[custId],(err,res)=>{
                        connection.release();
                        err?reject(err):resolve(res);
                    });
                }
            });
        });
    }

    static orderDeliver(userEmail,opid,qty)
    {
        return new Promise((resolve, reject)=>{
            const transport=nodeMailer.createTransport({
                host:"smtp.gmail.com",
                port:587,
                secure:false,
                requireTLS:true,
                auth:{
                    user:"jitupatil961@gmail.com",
                    pass:"2001@birth"
                }
            });
            
            var mailOptions={
                from:"jitupatil961@gmail.com",
                to:"jitupatil961@gmail.com",
                subject:"Online Home Delivery",
                text:"THANKYOU FOR SHOPPING HERE WE ARE VERY GLAD <br> DELIVERY BOY NUMBER : 9981059089<br>"
                +"<a href='http://localhost:3000/admin/verify' target='_blank>VERIFY</a>",
            }
        
            transport.sendMail(mailOptions, function(err,info){
                if(err) 
                    reject(err);
                else
                    resolve(info);
            });
        }); 
    }

    static decreaseProductQty(id)
    { 
        return new Promise((resolve, reject) =>{
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql="update product set pro_qty=? where id=?";
                    connection.query(sql,[id],(err,res)=>{
                        connection.release();
                        err?reject(err):resolve(res);
                    });
                }
            });
        });   
    }


    static removeOrder(opi)
    { 
        return new Promise((resolve, reject) =>{
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql="delete from order_product where ord_id=?";
                    connection.query(sql,[opi],(err,res)=>{
                        if(err)
                            reject(err);
                        else
                        { 
                            sql="delete from order_detail where id=?";
                            connection.query(sql,[opi],(err,result)=>{
                                err?reject(err):resolve(res);
                            });
                            
                        }
                    });
                }
            });
        });
    }
}