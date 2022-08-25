const pool=require("../connection/GetConnection");

module.exports=class Product
{ 
    constructor(pro_name,pro_price,pro_qty,cat_id,pro_date,pro_image, description, pro_image2, pro_image3, pro_image4)
    { 
        this.pro_name=pro;
        this.pro_price=pro_price;
        this.pro_qty=pro_qty;
        this.cat_id=cat_id
        this.pro_date=pro_date;
        this.pro_image=pro_image;
        this.description=description;
        this.pro_image2=pro_image2;
        this.pro_image3=pro_image3;
        this.pro_image4=pro_image4;
    }

    //To Fetch All Product From Product Table
    static fetchAllProduct(userId)
    {
      return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
              let sql ="";
              if(userId){
                sql = "select distinct product.id,product.pro_name,product.pro_price,product.pro_qty,product.description,product.pro_image,cart.pro_id,wishlist.pro_id as wishItem from product left outer join cart on product.id=cart.pro_id and cart.cust_id =? left outer join wishlist on product.id = wishlist.pro_id and wishlist.cust_id = ?";
              }
              else
              {
                  sql = "select * from product";
              }

              con.query(sql,[userId,userId],(err,queryResults)=>{
                con.release();
                err ? reject(err) : resolve(queryResults);
              });
            }
            else
              reject(err);
          })
        });
    }

    //To Fetch All Product From Product Table
    // static fetchLikeUnlike(userId)
    // {
    //   return new Promise((resolve,reject)=>{
    //     pool.getConnection((err,con)=>{
    //       if(!err){
    //         let sql ="";
    //         if(userId){
    //           sql = "select product.id,product.pro_name,product.pro_price,product.pro_qty,product.description,product.pro_image,wishlist.pro_id from product left outer join wishlist on product.id=wishlist.pro_id and wishlist.cust_id="+userId;
    //         }
    //         else
    //         {
    //             sql = "select * from product";
    //         }

    //         con.query(sql,(err,queryResults)=>{
    //           con.release();
    //           err ? reject(err) : resolve(queryResults);
    //         });
    //       }
    //       else
    //         reject(err);
    //     })
    //   });
    // }
}