var express = require('express');
// var cookieParser=require('cookie-parser');
var router = express.Router();

// 跳转到学生首页
router.get('/',function (req,res,next) {
    res.render('help');
})

module.exports = router;