var express = require("express");
var router = express.Router();
var mongodbOptions = require("./mongodbOptions");
var url = "mongodb://localhost:27017/";
var moment = require("moment");
const newData=String(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));

router.post("/clientListDistribution", function (req, res, next) {
  let selectedRowKeys = req.body.selectedRowKeys;
  let userName = req.body.userName[2];
  console.log("selectedRowKeys:" + typeof selectedRowKeys);
  console.log("userid:" + userName);
  var MongoClient = require("mongodb").MongoClient;
  try {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("crm738");
      dbo
        .collection("userInfo")
        .find({ name: userName })
        .toArray(function (err, result) {
          // 返回集合中所有数据
          if (err) throw err;
          if (typeof result !== undefined) {
            var phone = result[0].userid;
            console.log(phone);
            var whereStr = { phone: { $in: selectedRowKeys } }; // 查询条件{"$in":[1,2,3]}
            console.log(whereStr);
            var updateStr = {
              $set: { follow_up_person: userName, follow_up_person_uid: phone },
            }; //更新多条
            console.log(updateStr);
            dbo
              .collection("clientListDistribution")
              .updateMany(whereStr, updateStr, function (err, result1) {
                if (err) throw err;
                console.log("文档更新成功" + JSON.stringify(result1.matchedCount));
                if (result1.matchedCount>0) {
                    var logStr = {
                        "newData":newData,
                        "phone" : selectedRowKeys,
                        "follow_up_person" : userName,
                        "follow_up_person_uid" : phone,
                      };
                    dbo.collection("clientListDistriButionLog").find(whereStr, function(err, result2) {
                        if (err) throw err;
                        if(result2.matchedCount>0){
                        try{result2.forEach((result)=>{
                          dbo.collection("client").insertOne(result);
                          dbo.collection("clientListDistriButionLog").deleteOne({phone:result.phone});
                        }); }catch(err){
                          console.log(err);
                          res.send({
                            success: true,
                            status: "no",
                            message: "分配失败！",
                          });
                          return;
                        }}else{
                          res.send({
                            success: true,
                            status: "no",
                            message: "分配失败！",
                          });
                          return;
                        }
                    });

                    dbo.collection("clientListDistriButionLog").insertOne(userStr, function(err, result4) {
                      if (err) throw err;
                      console.log("分配记录成功");
                  });
                    res.send({
                        success: true,
                        status: "ok",
                        message: "分配成功！",
                      });
                      return;
                } else {
                    res.send({
                        success: true,
                        status: "no",
                        message: "分配失败！",
                      });
                      return;
                }
              });
          }
        });
    });
  } catch (err) {
    console.log(err);
    res.send({
        success: true,
        status: "no",
        message: "分配失败！",
      });
      return;
  }
});

module.exports = router;
