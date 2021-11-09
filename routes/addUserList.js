var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.post('/addUserList', function(req, res, next) {
    let userid = req.body.userid;
    let phone = req.body.phone;
    let customer_name = req.body.customer_name;
    let work = req.body.work;
    let create_time = req.body.create_time;
    let customer_star = req.body.customer_star;
    let open_show = req.body.open_show;

    let follow_up_person = req.body.follow_up_person;
    let follow_up_person_uid = req.body.follow_up_person_uid;
    let department = req.body.department;
    let creator = req.body.creator;
    
    console.log("useridADD:" +typeof  userid);
    console.log("phoneADD:" + phone);
    console.log("customer_nameADD:" + customer_name);
    console.log("workADD:" + work);
    console.log("create_timeADD:" + create_time);

    console.log("follow_up_personADD:" + follow_up_person);
    console.log("follow_up_person_uidADD:" + follow_up_person_uid);
    console.log("departmentADD:" + department);
    console.log("creatorADD:" + creator);






    let requestAddDataInto ={
        remarks: '',
        work: work,
        enterprise_type: '',
        establishment_time: '',
        customer_name: customer_name,
        job: '',
        birthday: '',
        date_of_incorporation: '',
        wechat: '',
        phone: phone,
        landline: '',
        registered_capital_currency: '',
        registered_capital_sum: '',
        contact_person_name: '',
        contact_person: '',
        address: '',
        nature_of_business: '',
        source: '',
        qq: '',
        e_mail: '',
        regional_country: '',
        province: '',
        city: '',
        District: '',
        primary_industry: '',
        secondary_industry: '',
        website: '',
        sex: '未知',
        create_time: create_time,
        last_dynamic_time: create_time,
        last_contact_time: '',
        customer_progress: '新入库',
        tag: '',
        customer_type: '个人客户',
        customer_star: customer_star,
        follow_up_person: follow_up_person,
        follow_up_person_uid: follow_up_person_uid,
        department: department,
        creator: creator,
        final_follow_up_record: '',
        key:1,
        international_waters: 0,
        call_status: 0,
        call_count: 0,
        open_show:open_show,
        userid:userid
      }
    
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("text");
        try {
            dbo.collection("text").insertOne(requestAddDataInto, function(err, res) {
                if (err) throw err;
                console.log("文档插入成功");
                db.close();
            });
            res.send({
                success: true,
                status: "ok",
                message: "添加成功！",
              });
              return;
         } catch (e) {
             console.log(e);
            res.send({
                success: true,
                status: "no",
                message: "添加失败！",
              });
              return;
         };
        
    });

    
    



 
});

module.exports = router;