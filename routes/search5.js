var express = require('express');
// var cookieParser=require('cookie-parser');
var router = express.Router();

// 跳转到搜索页
router.get('/',function (req,res,next) {
    res.render('search5',{user:req.session.user});
})

module.exports = router;