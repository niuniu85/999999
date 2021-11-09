var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

const addUser = ()=>{
    MongoClient.connect(url, function (err, db) {
        try {
          if (err) throw err;
          return false;
        } catch {
          var dbo = db.db("crm738");
          var myobj = { u_id: "13344556677", pwd: "123456" };
          dbo.collection("users").insertOne(myobj, function (err, res) {
            try {
              if (err) throw err;
              return false;
            } catch {
              console.log("文档插入成功");
              db.close();
              return true;
            }
          });
        }
      });
}
module.exports ={
    addUser,
}
