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

// body-parser 用于解析post数据  application/x-www.form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// multer 用于解析post文件  multipart/form-data
// var objMulter = multer({dest: './dist'}).array('file');
// 或者 var objMulter = multer({dest: './dist'}).any();
router.use(multer({ dest: "./uploads/clients" }).array("admin")); //此处的array('file')对应html部分的name
// app.use(objMulter );

router.post("/", function (req, res) {
  //  let temp3 =[{remarks:"",work:"双峰老阳建筑设备租赁有限公司",enterprise_type:"",establishment_time:"",customer_name:"朱连梅",job:"",birthday:"",date_of_incorporation:"",wechat:"",phone:"+86 18673868832",landline:"",registered_capital_currency:"",registered_capital_sum:"",contact_person_name:"",contact_person:"",address:"",nature_of_business:"",source:"未知",qq:"",e_mail:"",regional_country:"",province:"",city:"",District:"",primary_industry:"",website:"",sex:"未知",create_time:"2021-09-02 15:31:50",last_dynamic_time:"2021-09-02 15:31:50",last_contact_time:"",customer_progress:"新入库",tag:"",customer_type:"个人客户",customer_star:"一星",follow_up_person:"黄总",follow_up_person_uid:"15773809969",department:"中企会计",creator:"黄总","final_follow_up_record":"","key":1,"international_waters":0,"call_status":0,"call_count":0,"open_show":false,"userid":0},{remarks:"",work:"双峰县大荆建筑劳务有限公司",enterprise_type:"",establishment_time:"",customer_name:"刘建华",job:"",birthday:"",date_of_incorporation:"",wechat:"",phone:"+86 13873800565",landline:"",registered_capital_currency:"",registered_capital_sum:"",contact_person_name:"",contact_person:"",address:"",nature_of_business:"",source:"未知",qq:"",e_mail:"",regional_country:"",province:"",city:"",District:"",primary_industry:"",website:"",sex:"未知",create_time:"2021-09-02 15:31:49",last_dynamic_time:"2021-09-02 15:31:49",last_contact_time:"",customer_progress:"新入库",tag:"",customer_type:"个人客户",customer_star:"一星",follow_up_person:"黄总",follow_up_person_uid:"15773809969",department:"中企会计",creator:"黄总","final_follow_up_record":"","key":1,"international_waters":0,"call_status":0,"call_count":0,"open_show":false,"userid":0},{remarks:"",work:"双峰县名都农业服务有限公司",enterprise_type:"",establishment_time:"",customer_name:"郭春辉",job:"",birthday:"",date_of_incorporation:"",wechat:"",phone:"+86 13317383228",landline:"",registered_capital_currency:"",registered_capital_sum:"",contact_person_name:"",contact_person:"",address:"",nature_of_business:"",source:"未知",qq:"",e_mail:"",regional_country:"",province:"",city:"",District:"",primary_industry:"",website:"",sex:"未知",create_time:"2021-09-02 15:31:49",last_dynamic_time:"2021-09-02 15:31:49",last_contact_time:"",customer_progress:"新入库",tag:"",customer_type:"个人客户",customer_star:"一星",follow_up_person:"黄总",follow_up_person_uid:"15773809969",department:"中企会计",creator:"黄总1","final_follow_up_record":"","key":1,"international_waters":0,"call_status":0,"call_count":0,"open_show":false,"userid":0},]

  try {
    let newTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss") + "";
    let sheets = xlsx.parse(fs.readFileSync(req.files[0].path));
    let columns = sheets[0].data;
    if (columns[0].length !== 8) {
      res.status(501).send({
        success: true,
        status: "no",
        message:
          "导入的文档内容不符合，请确认格式为：{'公司','法人','联络人','法人手机','联络人手机','经营范围','成立时间（*必需格式*（2021/9/30））','地址',}",
      });
      return;
    }
    let columnsTemp = [];
    // let columnkeys=["work","customer_name","contact_person_name","phone","contact_person","nature_of_business","date_of_incorporation","address"];
    let columnkeys = [
      "remarks",
      "work",
      "enterprise_type",
      "establishment_time",
      "customer_name",
      "job",
      "birthday",
      "date_of_incorporation",
      "wechat",
      "phone",
      "landline",
      "registered_capital_currency",
      "registered_capital_sum",
      "contact_person_name",
      "contact_person",
      "address",
      "nature_of_business",
      "source",
      "qq",
      "e_mail",
      "regional_country",
      "province",
      "city",
      "District",
      "primary_industry",
      "website",
      "sex",
      "create_time",
      "last_dynamic_time",
      "last_contact_time",
      "customer_progress",
      "tag",
      "customer_type",
      "customer_star",
      "follow_up_person_uid",
      "creator",
      "follow_up_person",
      "final_follow_up_record",
      "key",
      "international_waters",
      "call_status",
      "call_count",
      "open_show",
      "userid",
    ];

    columns.forEach((column) => {
      if (column[2] !== undefined) {
        let columnTemp = {};
        columnTemp[columnkeys[0]] = "";
        columnTemp[columnkeys[2]] = "";
        columnTemp[columnkeys[3]] = "";
        columnTemp[columnkeys[5]] = "";
        columnTemp[columnkeys[6]] = "";
        columnTemp[columnkeys[7]] = "";
        columnTemp[columnkeys[8]] = "";
        columnTemp[columnkeys[9]] = "";
        columnTemp[columnkeys[10]] = "";
        columnTemp[columnkeys[11]] = "";
        columnTemp[columnkeys[12]] = "";
        columnTemp[columnkeys[13]] = "";
        columnTemp[columnkeys[14]] = "";
        columnTemp[columnkeys[15]] = "";
        columnTemp[columnkeys[16]] = "";
        columnTemp[columnkeys[17]] = "";
        columnTemp[columnkeys[18]] = "";
        columnTemp[columnkeys[19]] = "";
        columnTemp[columnkeys[20]] = "";
        columnTemp[columnkeys[21]] = "";
        columnTemp[columnkeys[22]] = "";
        columnTemp[columnkeys[23]] = "";
        columnTemp[columnkeys[24]] = "";
        columnTemp[columnkeys[25]] = "";
        columnTemp[columnkeys[26]] = "";
        columnTemp[columnkeys[27]] = "";
        columnTemp[columnkeys[28]] = "";
        columnTemp[columnkeys[29]] = "";
        columnTemp[columnkeys[30]] = "";
        columnTemp[columnkeys[31]] = "";
        columnTemp[columnkeys[32]] = "";
        columnTemp[columnkeys[33]] = "";
        columnTemp[columnkeys[34]] = "";
        columnTemp[columnkeys[35]] = "";
        columnTemp[columnkeys[36]] = "";
        columnTemp[columnkeys[37]] = "";
        columnTemp[columnkeys[38]] = "";
        columnTemp[columnkeys[39]] = "";
        columnTemp[columnkeys[40]] = "";
        columnTemp[columnkeys[41]] = "";
        columnTemp[columnkeys[42]] = "";
        columnTemp[columnkeys[43]] = "";

        columnTemp[columnkeys[1]] = column[0];

        columnTemp[columnkeys[4]] = column[1];

        columnTemp[columnkeys[13]] = column[2];

        columnTemp[columnkeys[9]] = column[3] + "";

        columnTemp[columnkeys[14]] = column[4] + "";
        columnTemp[columnkeys[16]] = column[5] + "";
        if (typeof column[6] === "number") {
          columnTemp[columnkeys[3]] =
            "" + moment(new Date(1900, 0, column[6] - 1)).format("YYYY-MM-DD");
        }
        columnTemp[columnkeys[15]] = column[7];
        columnTemp[columnkeys[27]] = newTime + "";

        columnTemp[columnkeys[28]] = newTime + "";

        columnTemp[columnkeys[30]] = "新入库";

        columnTemp[columnkeys[32]] = "个人客户";

        columnTemp[columnkeys[34]] = "";

        columnTemp[columnkeys[35]] = "黄总";

        columnTemp[columnkeys[42]] = "false";

        columnsTemp.push(columnTemp);
      }
    });
    console.log(columnsTemp);
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("crm738");
      let index = 0;
      columnsTemp.forEach((column) => {
        dbo.collection("client").insertOne(column, function (err, res) {
          try {
            if (err) throw err;
            console.log("插入的文档数量为:" + index++);
          } catch (err) {
            console.log(err);
          }
        });
      });
      res.send({
        success: true,
        status: "ok",
        message: "导入成功",
      });
      return;
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: true,
      status: "no",
      message: "导入失败",
    });
    return;
  }
});

module.exports = router;
