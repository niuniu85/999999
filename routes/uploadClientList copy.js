var express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const pathLib = require("path");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

// body-parser 用于解析post数据  application/x-www.form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// multer 用于解析post文件  multipart/form-data
// var objMulter = multer({dest: './dist'}).array('file');
// 或者 var objMulter = multer({dest: './dist'}).any();
router.use(
  multer({ dest: "./uploads/clients" }).array("15773809969" && "13627385555")
); //此处的array('file')对应html部分的name
// app.use(objMulter );

router.post("/", function (req, res) {
  //  let temp3 =[{remarks:"",work:"双峰老阳建筑设备租赁有限公司",enterprise_type:"",establishment_time:"",customer_name:"朱连梅",job:"",birthday:"",date_of_incorporation:"",wechat:"",phone:"+86 18673868832",landline:"",registered_capital_currency:"",registered_capital_sum:"",contact_person_name:"",contact_person:"",address:"",nature_of_business:"",source:"未知",qq:"",e_mail:"",regional_country:"",province:"",city:"",District:"",primary_industry:"",website:"",sex:"未知",create_time:"2021-09-02 15:31:50",last_dynamic_time:"2021-09-02 15:31:50",last_contact_time:"",customer_progress:"新入库",tag:"",customer_type:"个人客户",customer_star:"一星",follow_up_person:"黄总",follow_up_person_uid:"15773809969",department:"中企会计",creator:"黄总","final_follow_up_record":"","key":1,"international_waters":0,"call_status":0,"call_count":0,"open_show":false,"userid":0},{remarks:"",work:"双峰县大荆建筑劳务有限公司",enterprise_type:"",establishment_time:"",customer_name:"刘建华",job:"",birthday:"",date_of_incorporation:"",wechat:"",phone:"+86 13873800565",landline:"",registered_capital_currency:"",registered_capital_sum:"",contact_person_name:"",contact_person:"",address:"",nature_of_business:"",source:"未知",qq:"",e_mail:"",regional_country:"",province:"",city:"",District:"",primary_industry:"",website:"",sex:"未知",create_time:"2021-09-02 15:31:49",last_dynamic_time:"2021-09-02 15:31:49",last_contact_time:"",customer_progress:"新入库",tag:"",customer_type:"个人客户",customer_star:"一星",follow_up_person:"黄总",follow_up_person_uid:"15773809969",department:"中企会计",creator:"黄总","final_follow_up_record":"","key":1,"international_waters":0,"call_status":0,"call_count":0,"open_show":false,"userid":0},{remarks:"",work:"双峰县名都农业服务有限公司",enterprise_type:"",establishment_time:"",customer_name:"郭春辉",job:"",birthday:"",date_of_incorporation:"",wechat:"",phone:"+86 13317383228",landline:"",registered_capital_currency:"",registered_capital_sum:"",contact_person_name:"",contact_person:"",address:"",nature_of_business:"",source:"未知",qq:"",e_mail:"",regional_country:"",province:"",city:"",District:"",primary_industry:"",website:"",sex:"未知",create_time:"2021-09-02 15:31:49",last_dynamic_time:"2021-09-02 15:31:49",last_contact_time:"",customer_progress:"新入库",tag:"",customer_type:"个人客户",customer_star:"一星",follow_up_person:"黄总",follow_up_person_uid:"15773809969",department:"中企会计",creator:"黄总1","final_follow_up_record":"","key":1,"international_waters":0,"call_status":0,"call_count":0,"open_show":false,"userid":0},]

  try {
    fs.readFile(req.files[0].path, function (err, data) {
      if (err) {
        console.log("Error");
      } else {
        console.log(req.files[0].path);
        let temp1 = data.toString();
          temp1 = temp1.replace(/"备注"/g, '"remarks"');
          temp1 = temp1.replace(/"工作单位"/g, '"work"');
          temp1 = temp1.replace(/"企业类型"/g, '"enterprise_type"');
          temp1 = temp1.replace(/"成立时间"/g, '"establishment_time"');
          temp1 = temp1.replace(/"客户全名"/g, '"customer_name"');
          temp1 = temp1.replace(/"职务"/g, '"job"');
          temp1 = temp1.replace(/"生日"/g, '"birthday"');
          temp1 = temp1.replace(/"成立日期"/g, '"date_of_incorporation"');
          temp1 = temp1.replace(/"微信"/g, '"wechat"');
          temp1 = temp1.replace(/"手机"/g, '"phone"');
          temp1 = temp1.replace(/"座机"/g, '"landline"');
          temp1 = temp1.replace(/"注册资金：币种"/g,'"registered_capital_currency"');
          temp1 = temp1.replace(/"注册资金：金额"/g, '"registered_capital_sum"');
          temp1 = temp1.replace(/"联络员姓名"/g, '"contact_person_name"');
          temp1 = temp1.replace(/"联络员"/g, '"contact_person"');
          temp1 = temp1.replace(/"地址"/g, '"address"');
          temp1 = temp1.replace(/"经营范围"/g, '"nature_of_business"');
          temp1 = temp1.replace(/"来源"/g, '"source"');
          temp1 = temp1.replace(/"QQ"/g, '"qq"');
          temp1 = temp1.replace(/"邮箱"/g, '"e_mail"');
          temp1 = temp1.replace(/"地区：国家"/g, '"regional_country"');
          temp1 = temp1.replace(/"地区：省\/州"/g, '"province"');
          temp1 = temp1.replace(/"地区：城市"/g, '"city"');
          temp1 = temp1.replace(/"地区：区\/县"/g, '"District"');
          temp1 = temp1.replace(/"行业"/g, '"primary_industry"');
          temp1 = temp1.replace(/"第二行业"/g, '"secondary_industry"');
          temp1 = temp1.replace(/"网址"/g, '"website"');
          temp1 = temp1.replace(/"性别"/g, '"sex"');
          temp1 = temp1.replace(/"创建时间"/g, '"create_time"');
          temp1 = temp1.replace(/"最近动态时间"/g, '"last_dynamic_time"');
          temp1 = temp1.replace(/"最后联系时间"/g, '"last_contact_time"');
          temp1 = temp1.replace(/"客户进展"/g, '"customer_progress"');
          temp1 = temp1.replace(/"标签"/g, '"tag"');
          temp1 = temp1.replace(/"客户类型"/g, '"customer_type"');
          temp1 = temp1.replace(/"客户星级"/g, '"customer_star"');
          temp1 = temp1.replace(/"跟进人EC号"/g, '"follow_up_person_uid"');
          temp1 = temp1.replace(/"跟进人"/g, '"follow_up_person"');          
          temp1 = temp1.replace(/"部门"/g, '"department"');
          temp1 = temp1.replace(/"创建人"/g, '"creator"');
          temp1 = temp1.replace(/"最后跟进记录":""/g,'"final_follow_up_record":"","key":"1","international_waters":"0","call_status":"0","call_count":"0","open_show":"false","userid":"0"');
            temp1=temp1.replace("\r\n"," ");
            temp1=temp1.replace(" ","");
            console.log('``````````````````'+typeof temp1)
          console.log(temp1)
          let fileName= 'routes\\up\\load'+req.files[0].fieldname+req.files[0].originalname.replace('txt','json')
          fs.writeFile(fileName, temp1,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");
            console.log("--------我是分割线-------------")
            console.log("读取写入的数据！");
            console.log(fileName);
         });        
      }
    });
  } catch (err) {
    console.log(err);
    res.send({
      stuats: "ok",
      type: "upload",
      userid: req.files[0].originalname,
    });
  }
});

module.exports = router;
