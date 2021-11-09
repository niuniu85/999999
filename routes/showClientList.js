var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId

router.get("/", function (req, res, next) {
  var c_id;
  console.log((c_id = req.query["id"]) == undefined);
  console.log('c_id:'+c_id);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("crm738");
    try {
      dbo
        .collection("client")
        .find({ _id: ObjectId(c_id)})
        .toArray(function (err, result) {
          // 返回集合中所有数据
          if (err) throw err;
          if (typeof result != undefined) {
          console.log("查询到数据"+JSON.stringify(result[0]));
          db.close();
          res.send({
            success: true,
            status: "ok",
            message: "获取客户详情成功！",
            data: result[0]
          });}else{
            res.send({
              success: true,
              status: "no",
              message: "获取客户详情失败！",
            });
            return;
          }
        });
    } catch (e) {
      console.log(e);
      res.send({
        success: true,
        status: "no",
        message: "获取客户详情失败！",
      });
      return;
    }
  });
});

module.exports = router;
