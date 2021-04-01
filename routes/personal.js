var express = require('express');
// var cookieParser=require('cookie-parser');
var router = express.Router();

// 跳转到搜索页
router.get('/',function (req,res,next) {
    console.log(req.session.role);
    if(req.session.role==="false"){
        console.log("是学生");
    res.render('personal',{userid:req.session.userid,role:req.session.role});}
    else res.render("error");
})
router.get('/:kind',function (req,res,next) {
    console.log(req.session.role);
    if(req.session.role==="false"){
        console.log("是学生");
        res.render("error");}
    else{
        console.log("是管理人员！");
        res.render('NTUpersonal',{userid:req.session.userid,role:req.session.role,kind:req.params.kind});
    }
})
module.exports = router;