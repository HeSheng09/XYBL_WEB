var express = require('express');
// var cookieParser=require('cookie-parser');
var router = express.Router();

// 跳转到搜索页
router.get('/',function (req,res,next) {
    res.render('login1',{userid:req.session.userid,role:req.session.role});
})

// 以post方式提交登录信息
router.post('/commit',function (req,res,next) {
    let params=req.body;
    req.session.userid=params.userid;
    req.session.role=params.role;
    console.log(req.session.userid);
    console.log(req.session.role);
    res.redirect("/firstpage");
})

module.exports = router;