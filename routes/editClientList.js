var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId

router.post("/", function (req, res, next) {
   let c_id = req.body.c_id;
   let last_dynamic_time = req.body.last_dynamic_time;
   let remarks = req.body.remarks;
   let tag = req.body.tag;
   let call_status = req.body.call_status;
   let call_count = req.body.call_count;
   let open_show = req.body.open_show;
   let phone = req.body.phone;
   let customer_name = req.body.customer_name;
   let work = req.body.work;
   let follow_up_person = req.body.follow_up_person;
    
    console.log("c_idEDIT:" +c_id);
    console.log("last_dynamic_timeEDIT:" +last_dynamic_time);
    console.log("remarksEDIT:" +remarks);
    console.log("tagEDIT:" +tag);
    console.log("call_statusEDIT:" +call_status);
    console.log("call_countEDIT:" +call_count);
    console.log("open_showEDIT:" +open_show);
    

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("crm738");
    try {
      var whereStr = {_id: ObjectId(c_id)};  // 查询条件
      var updateStr = {$set: { 
        "last_dynamic_time" : last_dynamic_time,
        "remarks" : remarks,
        "tag" : tag,
        "call_status" : call_status,
        "call_count" : call_count,
        "open_show" : open_show,
      }};
      var logStr = {
        "follow_up_person" : follow_up_person,
        "phone" : phone,
        "customer_name" : customer_name,
        "work" : work,
        "last_dynamic_time" : last_dynamic_time,
        "remarks" : remarks,
        "tag" : tag,
        "call_status" : call_status,
        "call_count" : call_count,
        "open_show" : open_show,
      };
      dbo
        .collection("client")        
        .updateOne(whereStr, updateStr,function (err, result) {
          // 返回集合中所有数据
          if (err) throw err;
          if (typeof result != undefined) {
          console.log("查询到数据"+JSON.stringify(result));

          dbo
        .collection("clientLog")        
        .insertOne(logStr,function (err, result1) {
          // 返回集合中所有数据
          if (err) throw err;
          console.log(result1.acknowledged);
          db.close();
          res.send({
            success: true,
            status: "ok",
            message: "更新客户详情成功！",
            data: result
          });
        })
          }else{
            res.send({
              success: true,
              status: "no",
              message: "更新客户详情失败！",
            });
            return;
          }
        });
    } catch (e) {
      console.log(e);
      res.send({
        success: true,
        status: "no",
        message: "更新客户详情失败！",
      });
      return;
    }
  });
});

module.exports = router;
