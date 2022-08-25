const Query = require("../model/Query");

exports.queryPost=(req, res, next)=>{
    var query=new Query(req.body.name,req.body.email,req.body.mobile,req.body.subject,req.body.query);
    query.save()
    .then(result=>{
        res.redirect("/");
    })
    .catch(err=>{

    });
}   