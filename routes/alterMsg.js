var express = require('express');
// var cookieParser=require('cookie-parser');
var router = express.Router();

// 跳转到搜索页
router.get('/',function (req,res,next) {
    res.render('alterMsg',{userid:req.session.userid,role:req.session.role});
})

module.exports = router;