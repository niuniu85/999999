var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.post('/delClientList', function(req, res) {
    let selectedRowKeys = req.body.selectedRowKeys;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("crm738");
        var whereStr = { phone: { $in: selectedRowKeys } }  // 查询条件
        dbo.collection("client").deleteMany(whereStr, function(err, obj) {
            try{if (err) throw err;
                console.log(obj.deletedCount + " 条文档被删除");
                if (obj.deletedCount>0) {
                    var logStr = {
                        "newData":newData,
                        "phone" : selectedRowKeys,
                        "follow_up_person" : userName,
                        "follow_up_person_uid" : phone,
                      };
                    dbo.collection("clientListDelLog").insertOne(logStr, function(err, result2) {
                        if (err) throw err;
                        console.log("删除记录成功");
                        db.close();
                    });
                    res.send({
                        success: true,
                        status: "ok",
                        message: "删除成功！",
                      });
                      return;
                }}catch(err){console.log(err);
                    res.send({
                        success: true,
                        status: "no",
                        message: "删除失败！",
                      });
                      return;
                }
        });
    });
 
});

module.exports = router;