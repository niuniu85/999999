var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/followUpRecord', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        try{if (err) throw err;
            var dbo = db.db("crm738");
            dbo.collection("clientLog"). find({}).toArray(function(err, result) { // 返回集合中所有数据
                if (err) throw err;
                if (result.length>0) {
                    db.close();
                    res.send({
                        success:true,
                        status:"ok",
                        message:"查询成功",
                        data:result
                    })
                    return;
                }else{
                    res.send({
                        success:true,
                        status:"no",
                        message:"查询失败"
                    })
                    return;
                }
            });}catch(err){
                console.log(err);
                res.send({
                    success:true,
                    status:"no",
                    message:"查询失败"
                })
                return;
            }
    });
 
});

module.exports = router;