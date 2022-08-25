const pool = require("../connection/GetConnection");

module.exports= class WishList 
{ 
    constructor(cust_id,pro_id)
    { 
        this.cust_id = cust_id;
        this.pro_id = pro_id;
    }

    save()
    { 
        return new Promise((resolve, reject) => {
            pool.getConnection((err,connection)=>{
                if(err) 
                    return reject(err);
                else
                {
                    let sql="insert into wishlist(cust_id,pro_id) values(?,?)";
                    connection.query(sql, [this.cust_id, this.pro_id],(err,result)=>{
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
    }

    static allWishlist(cust_id) 
    {
        return new Promise((resolve, reject) => {
            pool.getConnection((err,connection)=>{
                if(err) 
                    reject(err);
                else
                { 
                    let sql="select product.id,product.pro_image,product.description,product.pro_price, product.pro_name from wishlist inner join product on wishlist.pro_id = product.id where wishlist.cust_id=?";
                    connection.query(sql,[cust_id],(err,result)=>
                    {
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
       });
   
    }


    static remove(pro_id)
    { 
        return new Promise((resolve, reject)=>{
            pool.getConnection((err,connection)=>{
                if(err) 
                    reject(err);
                else
                { 
                    let sql="delete from wishlist where pro_id = ?";
                    connection.query(sql,[pro_id],(err,result)=>
                    {
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
        
    }
}