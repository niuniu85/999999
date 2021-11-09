var express = require("express");
var router = express.Router();
var mongodbOptions = require("./mongodbOptions");
var url = "mongodb://localhost:27017/";

router.post("/client", function (req, res) {
    console.log(JSON.stringify(req.cookies));
    let userid = req.body.userid;
    console.log("userid:" + userid);
    var MongoClient = require("mongodb").MongoClient;
    try {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("crm738");
        dbo
          .collection("userInfo")
          .find({ userid: userid })
          .toArray(function (err, count1) {
            // 返回集合中所有数据
            if (err) throw err;
            if (typeof result1 != undefined) {
              console.log(typeof count1);
              res.send({
                data: count1[0],
              });
            } else {
              res.send({
                errorCode: "error",
                errorMessage: "账户或密码错误！",
                success: true,
              });
            }
            return;
          });
      });
    } catch {
      res.send({
        errorCode: "401",
        errorMessage: "请先登录！",
        success: true,
      });
      return;
    }
  });

  module.exports = router;