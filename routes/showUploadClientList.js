var express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const moment = require("moment");
const multer = require("multer");
const pathLib = require("path");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
let xlsx = require("node-xlsx");
require('./layout');

router.get("/", function (req, res) {
  try {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("crm738");
      dbo
        .collection("client")
        .find({follow_up_person:''})
        .toArray(function (err, dataSource) {
          if (err) throw err;
          if (typeof dataSource != undefined) {
            dbo
              .collection("uploadClientColumns")
              .find()
              .toArray(function (err, columns) {
                if (err) throw err;
                if (typeof columns != undefined) {
                  dbo
                    .collection("personnel")
                    .find()
                    .toArray(function (err, personnel) {
                      if (err) throw err;
                      if (typeof personnel != undefined) {
                        res.send({
                          success: true,
                          data: {
                            dataSource,
                            columns,
                            layout,
                            personnel,
                          },
                          massage: "数据导入成功！",
                        });
                      }
                    });
                }
              });
          } else {
            res.send({
              success: false,
              massage: "数据导入失败！",
            });
          }
        });
    });
  } catch (err) {
    console.log(err);
    res.send({ success: false, massage: "数据导入失败！" });
  }
});
module.exports = router;
