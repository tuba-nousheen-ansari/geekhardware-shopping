const pool=require("../connection/GetConnection");

module.exports =class Query
{ 
    constructor(name,email,mobile,subject,query)
    { 
        this.email=email;
        this.mobile=mobile;
        this.subject=subject;
        this.query=query;
        this.name=name;
    }

    save()
    { 
        return new Promise((resolve, reject)=>{
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    let sql="insert into customersupport(name,email,mobile,subject,query) values(?,?,?,?,?)";
                    connection.query(sql,[this.name,this.email,this.mobile,this.subject,this.query],(err,result)=>{
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
    }
}