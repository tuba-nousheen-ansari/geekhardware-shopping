const pool=require("../connection/GetConnection.js");

module.exports =class Admin
{
    constructor(email,password)
    { 
        this.email=email;
        this.password=password;
    }

    checkLogin()
    { 
        return new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                if(err)
                    reject(err);
                else
                {
                    let sql="select * from admin where email=? and password=?";
                    connection.query(sql, [this.email, this.password],(err,result)=>{
                        connection.release();
                         
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
    }

    static allCustomer()
    {
        return new Promise((resolve,reject) => {
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql="select * from customer";
                    connection.query(sql, [],(err,result)=>{
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
    }

    static customerQuery()
    { 
        return new Promise((resolve,reject) => {
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql="select * from customersupport";
                    connection.query(sql, [],(err,result)=>{
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
    }
}