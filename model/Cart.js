const pool=require("../connection/GetConnection");

module.exports=class Cart
{ 
    constructor(cust_id,pro_id)
    { 
        this.cust_id=cust_id;
        this.pro_id=pro_id;
    }

    addToCart(pro_id,cust_id)
   { 
       return new Promise((resolve, reject)=>{
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    let sql="insert into cart(cust_id,pro_id) values(?,?)";
                    connection.query(sql,[cust_id,pro_id],(err,result)=>{
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
       });
   }



   removeFromCart(pro_id,cust_id)
   { 
       return new Promise((resolve, reject)=>{
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    let sql="delete from cart where cust_id = ? and pro_id = ?";
                    connection.query(sql,[cust_id,pro_id],(err,result)=>{
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
       });
   }

   static allCart(cust_id) {
    return new Promise((resolve, reject) => {
         pool.getConnection((err,connection)=>{
             if(err) 
                 reject(err);
             else
             { 
                 let sql="select cart.pro_id,product.pro_image,product.description,product.pro_qty,product.pro_price, product.pro_name from product inner join cart on cart.pro_id = product.id where cart.cust_id=?";
                 connection.query(sql,[cust_id],(err,result)=>
                 {
                     connection.release();
                     err?reject(err):resolve(result);
                 });
             }
         });
    });
}

    static removeAllCart(cust_id) 
    {
        return new Promise((resolve, reject) =>{
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    let sql="delete from cart where cust_id=?";
                    connection.query(sql,[cust_id],(err,result)=>{
                        if(err)
                            return reject(err);
                        else
                        { 
                            connection.release();
                            err?reject(err):resolve(result);
                        }
                    });
                }
            });
        });
    }
}