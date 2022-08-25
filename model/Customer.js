const pool=require("../connection/GetConnection");

module.exports=class Customer 
{
    constructor(name,email,mobile,address,gender,password) 
    {
        this.name=name;
        this.email=email;
        this.mobile=mobile;
        this.address=address;
        this.gender=gender;
        this.password=password;
    }

    customerRegister() 
    {
        return new Promise((resolve, reject) =>{
            pool.getConnection((err, connection) =>{
                if(err) 
                    return reject(err);
                else 
                {
                    var sql="insert into customer(name,email,mobile,address,gender,password) values(?,?,?,?,?,?)";
                    connection.query(sql,[this.name,this.email,this.mobile,this.address,this.gender,this.password],(err, result)=>{
                        connection.release();
                        if(err) 
                            return reject(err);
                        else
                            return resolve(result);
                    });
                }
            });
        });
    }


    customerLogin() 
    {
        return new Promise((resolve, reject) =>{
            pool.getConnection((err, connection) =>{
                if(err) 
                    return reject(err);
                else 
                {
                    var sql="select * from customer where email=? and password=?";
                    connection.query(sql,[this.email,this.password],(err, result)=>{
                        connection.release();
                        if(err) 
                            return reject(err);
                        else
                            return resolve(result);
                    });
                }
            });
        });
    }
}