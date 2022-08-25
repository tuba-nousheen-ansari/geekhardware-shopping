const pool=require("../connection/GetConnection");

module.exports=class Category
{ 
    constructor(cat_name,cat_image) 
    {
        this.cat_name=cat_name;
        this.cat_image=cat_image;
    }

    static allCategory() {
        return new Promise((resolve, reject)=>{
             pool.getConnection((err,connection)=>{
                 if(err)
                     reject(err);
                 else
                 {
                     var sql ="select * from category"
                         connection.query(sql,[],(err,result)=>{
                         connection.release();
                         err?reject(err):resolve(result);
                     });
                 }
             });
        });
    }



    static allProductByCategory(id) {
        return new Promise((resolve, reject)=>{
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql ="select * from product where cat_id=? "
                        connection.query(sql,[id],(err,result)=>{
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
       }
}