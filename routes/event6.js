var express = require('express');
// var cookieParser=require('cookie-parser');
var router = express.Router();

// // 跳转到搜索页
// router.get('/',function (req,res,next) {
//     console.log(req.session);
//     res.render('event6',{user:req.session.user,eventid:req.session.eventid});
// })

// 跳转到搜索页
router.get('/:eventid',function (req,res,next) {
    console.log("wolaile!!!!")
    req.session.eventid=req.params.eventid;
    console.log(req.session);
    if(req.session.role==="false"){
        console.log("是学生");
        res.render('event6',{userid:req.session.userid,role:req.session.role,eventid:req.session.eventid});
    }
})
router.get('/:eventid/:eventkind',function (req,res,next) {
    console.log("wolaile!!!!")
    req.session.eventid=req.params.eventid;
    req.session.eventkind=req.params.eventkind
    console.log(req.session);
    if(req.session.role==="false"){
        console.log("是学生");
    }
    else{
        console.log("是管理人员！");
        res.render('NTUevent6',{userid:req.session.userid,role:req.session.role,eventid:req.session.eventid,eventkind:req.session.eventkind});
    }
})

// router.post('/',function (req,res,next) {
//     let params=req.body;
//     console.log("接受请求成功！")
//     console.log(params);
//     res.render('event6',{user:req.session.user,eventid:params.eventid});
// })


module.exports = router;