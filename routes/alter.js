var express = require('express');
// var cookieParser=require('cookie-parser');
var router = express.Router();

// 跳转到搜索页
// router.get('/',function (req,res,next) {
//     res.render('alter',{userid:req.session.userid,role:req.session.role});
// });

router.get('/:eventid',function (req,res,next) {
        req.session.noweid=req.params.eventid;
        res.render('alter2',{userid:req.session.userid,role:req.session.role,eventid:req.session.eventid,noweid:req.session.noweid});
})

module.exports = router;