var express = require('express');
var router = express.Router();

// 跳转到login页面
router.get("/",function (req,res,next) {
    res.render("login");
})

// 以post方式提交登录信息
router.post('/commit',function (req,res,next) {
    let params=req.body;
    if(params.user==="张三" && params.password==="password"){
        req.session.user="张三";
        res.redirect("/student")
        // res.render('student',{user: params.user});
        // res.send("登录成功");
    }else{
        res.send("登录失败");
    }
})

// 以get方式提交登录信息
router.get('/commit',function (req,res,next) {
    let params=req.query || req.params;
    if(params.user==="张三" && params.password==="password"){
        res.session.user="张三";
        res.redirect("/student");
    }else{
        res.send("登录失败");
    }
})

module.exports = router;