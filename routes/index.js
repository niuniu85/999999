var express = require("express");
var router = express.Router();
var mongodbOptions = require("./mongodbOptions");
var url = "mongodb://localhost:27017/";

//login
router.post("/api/login/account", function (req, res) {
  
  let username = req.body.username;
  let password = req.body.password;
  console.log("username:" + username);
  console.log("password:" + password);

  var MongoClient = require("mongodb").MongoClient;

  MongoClient.connect(url, function (err, db) {
    try {
      if (err) throw err;
      var dbo = db.db("crm738");
      dbo
        .collection("users")
        .find({ u_id: username })
        .count(function (err, count1) {
          // 返回集合中所有数据
          if (err) throw err;
          console.log("帐号：" + count1);
          if (count1 == 1) {
            dbo
              .collection("users")
              .find({ u_id: username, pwd: password })
              .count(function (err, count2) {
                // 返回集合中所有数据
                if (err) throw err;
                console.log("密码：" + count2);
                if (count2 == 1) {
                  res.cookie("crmid", "100")
                  if (username === "15773809969") {
                    res.send({
                      status: "ok",
                      type: "account",
                      currentAuthority: "admin",
                      userid: username,
                    });
                    return;
                  }
                  res.send({
                    status: "ok",
                    type: "string",
                    currentAuthority: "user",
                    userid: username,
                  });
                  return;
                } else {
                  res.send({
                    status: "error",
                    type: "account",
                    currentAuthority: "guest1",
                  });
                  return;
                }
              });
          } else {
            res.send({
              status: "error",
              type: "account",
              currentAuthority: "guest2",
            });
            return;
          }
        });
    } catch {
      res.send({
        status: "error",
        type: "account",
        currentAuthority: "guest3",
      });
      return;
    }
  });
});

//outlogin
router.post("/api/login/outLogin", function (req, res) {
  res.send({
    data: {},
    success: true,
  });
});

//userInfo
router.post("/api/currentUser", function (req, res) {
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

//clientList
router.get("/api/client", function (req, res) {
  var u_id;
  var page;
  var per_page;
  var sortQuery;
  var order;
  console.log((u_id = req.query["id"]) == undefined);
  console.log((page = Number(req.query["page"]) ) == undefined);
  console.log((per_page = Number(req.query["per_page"]) ) == undefined);
  console.log((sortQuery = req.query["sortQuery"]) == undefined);
  console.log((order = req.query["order"]) == undefined);
  console.log(u_id);
  console.log('page'+typeof page);
  console.log('per_page'+typeof per_page);
  console.log('排序sortQuery：'+sortQuery);
  console.log('排序order：'+order);

  var MongoClient = require("mongodb").MongoClient;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("crm738");
    dbo
      .collection("client")
      .find({ follow_up_person_uid: u_id })
      .count(function (err, count) {
        // 返回集合中所有数据
        console.log("count:" + count);
        if (err) throw err;
        if (typeof count != undefined) {
          let total = count;
          let per;
          let per_p;
          per=Number(page-1)*per_page;
         
          dbo
            .collection("client")
            .find({ follow_up_person_uid: u_id }, { _id: 0 })
            .skip(per).limit(per_page)
            .sort({'create_time':order})
            .toArray(function (err, result1) {
              // 返回集合中所有数据
              if (err) throw err;
              if (typeof result1 != undefined) {
                dbo
                  .collection("client_columns")
                  .find({}, { _id: 0 })
                  .toArray(function (err, result2) {
                    //返回表单头
                    if (err) throw err;
                    db.close();
                    if (typeof result2 != undefined) {
                      // let temp = JSON.stringify(result);
                      res.send({
                        success: true,
                        message: "",
                        data: {
                          dataSource: result1,
                          layout: {
                            tableColumn: {
                              result2,
                            },
                            tableToolBar: {
                              component: "button",
                              text: "添加",
                              type: "primary",
                              action: "modal",
                              id: "addClientList",
                              uri: "/api/client/edit/:id",
                              method: "post",
                            },
                            batchToolBar: {
                              component: "button",
                              text: "删除",
                              type: "primary",
                              action: "modal",
                              id: "delCountClientList",
                              uri: "/api/client/delCount/:id",
                              method: "post",
                            },
                          },
                          page: { title: "string", type: "string" },
                          meta: { total: total, page: page, per_page: per_page },
                        },
                      });
                    }
                  });
              }
            });
        }
      });
  });
});


//openclientList
router.get("/api/openclient", function (req, res) {
  var u_id;
  var page;
  var per_page;
  var sortQuery;
  var order;
  console.log((u_id = req.query["id"]) == undefined);
  console.log((page = Number(req.query["page"]) ) == undefined);
  console.log((per_page = Number(req.query["per_page"]) ) == undefined);
  console.log((sortQuery = req.query["sortQuery"]) == undefined);
  console.log((order = req.query["order"]) == undefined);
  console.log(u_id);
  console.log('page'+typeof page);
  console.log('per_page'+typeof per_page);
  console.log('排序sortQuery：'+sortQuery);
  console.log('排序order：'+order);

  var MongoClient = require("mongodb").MongoClient;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("crm738");
    dbo
      .collection("openclient")
      .find()
      .count(function (err, count) {
        // 返回集合中所有数据
        console.log("count:" + count);
        if (err) throw err;
        if (typeof count != undefined) {
          let total = count;
          let per;
          let per_p;
          per=Number(page-1)*per_page;
         
          dbo
            .collection("openclient")
            .find()
            .skip(per).limit(per_page)
            .sort({'create_time':order})
            .toArray(function (err, result1) {
              // 返回集合中所有数据
              if (err) throw err;
              if (typeof result1 != undefined) {
                dbo
                  .collection("client_columns")
                  .find({}, { _id: 0 })
                  .toArray(function (err, result2) {
                    //返回表单头
                    if (err) throw err;
                    
                    if (typeof result2 != undefined) {
                      dbo
                    .collection("personnel")
                    .find()
                    .toArray(function (err, personnel) {
                      if (err) throw err;
                      if (typeof personnel != undefined) {
                      // let temp = JSON.stringify(result);
                      res.send({
                        success: true,
                        message: "",
                        data: {
                          dataSource: result1,
                          layout: {
                            tableColumn: {
                              result2,
                            },
                            tableToolBar: {
                              component: "button",
                              text: "添加",
                              type: "primary",
                              action: "modal",
                              id: "addClientList",
                              uri: "/api/client/edit/:id",
                              method: "post",
                            },
                            batchToolBar: {
                              component: "button",
                              text: "删除",
                              type: "primary",
                              action: "modal",
                              id: "delCountClientList",
                              uri: "/api/client/delCount/:id",
                              method: "post",
                            },
                          },
                          page: { title: "string", type: "string" },
                          meta: { total: total, page: page, per_page: per_page },
                          personnel
                        },
                        
                      });}})
                    }
                  });
              }
            });
        }
      });
  });
});


router.get("/api/getClientList", function (req, res) {
  var u_id;
  console.log((u_id = req.query["id"]) == undefined);
  console.log(u_id);
  var reg = /[0-9]+/;
  if (reg.test(u_id)) {
    var MongoClient = require("mongodb").MongoClient;

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("crm738");
      dbo
        .collection("users")
        .find({ u_id: u_id })
        .toArray(function (err, result1) {
          //是否存在此用户
          console.log("是否存在此用户：" + result1[0]);
          if (err) throw err;
          if (typeof result1 != undefined) {
            dbo
              .collection("client_columns")
              .find({}).sort({last_dynamic_time:-1})
              .toArray(function (err, result2) {
                //返回表单头
                console.log("表单头部：" + result2[0]);
                if (err) throw err;
                db.close;
                if (typeof result2 != undefined) {
                  res.send({
                    success: true,
                    message: "",
                    data: {
                      layout: { tableColumn: { result2 } },
                    },
                  });
                  return;
                }
                res.send({ success: true, message: "不要乱来哦！" });
                return;
              });
          }
        });
    });
  } else {
    res.send({ success: true, message: "不要乱来哦！" });
    return;
  }
});

router.post("/api/testAdd",function (req,res) {
  res.json()
})

module.exports = router;