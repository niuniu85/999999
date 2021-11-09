var express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const pathLib = require("path");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";




let fileName ='C:\\Users\\Administrator\\Desktop\\666ok.txt';
let savaFileName ='C:\\Users\\Administrator\\Desktop\\666ok.json';
fs.readFile(fileName, function (err, data) {
  if (err) {
     return console.error(err);
  }
 //  console.log("异步读取文件数据: " + data.toString());

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
          temp1 = temp1.replace(/"客户星级"/g, '"customer_star"');
          temp1 = temp1.replace(/"跟进人EC号"/g, '"follow_up_person_uid"');
          temp1 = temp1.replace(/"最后跟进人"/g, '"follow_up_person"');          
          temp1 = temp1.replace(/"部门"/g, '"department"');
          temp1 = temp1.replace(/"创建人"/g, '"creator"');         
          temp1 = temp1.replace(/"最后跟进记录":""/g,'"final_follow_up_record":"","key":"1","international_waters":"0","call_status":"0","call_count":"0","open_show":"true","userid":"0"');
          temp1=temp1.replace(/\+86 /g,"");
            temp1=temp1.replace(/"\r\n"/g,"");
            temp1=temp1.replace(/\\/g," ");
            temp1=temp1.replace(/\、/g," ");
            temp1=temp1.replace(/\;/g," ");
            temp1=temp1.replace(/" "/g,"");
            console.log('``````````````````'+typeof temp1)
          console.log(temp1)
          fs.writeFile(savaFileName, temp1,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");
            console.log("--------我是分割线-------------");
         });
          // MongoClient.connect(url, function (err, db) {
          //   try {
          //     if (err) throw err;
          //     var dbo = db.db("text");
          //     //写入数据库
          //     dbo.collection("text").insertOne(temp1, function (err, resu) {
          //       try{
          //         if (err) throw err;
          //         console.log("tbfile文件写入数据库成功");
          //         db.close();
          //       }catch(err){
          //         console.log(err);
          //       }                
          //     })}catch(err){console.log(err);}
          //   });
    
        });   
        
        
