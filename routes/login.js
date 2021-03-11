var express = require('express');
var request=require('request')
var router = express.Router();

// 跳转到login页面
router.get("/", function (req, res, netx) {
    res.render("login");
})

// 以post方式提交登录信息
router.post('/commit', function (req, res, next) {
    let params = req.body;
    console.log(params)
    request.post({
        url: 'http://localhost:8080/server/user/login',
        form: {name: params.username, pwd: params.pwd}
    }, function (error, response, body) {
        // 返回的结果和 GET 一样
        if (!error && response.statusCode === 200) {
            let data = JSON.parse(body).data;
            console.log(data)
            req.session.user = data.id;
            req.session.role = data.role;
            res.render("student", {id: data.id, name: data.name, password: data.pwd, role: data.role})
        } else {
            console.log(error)
            res.send('error')
        }
    })
})

// 以get方式提交登录信息
router.get('/commit', function (req, res, next) {
    let params = req.query || req.params;
    if (params.user === "张三" && params.password === "password") {
        res.session.user = "张三";
        res.redirect("/student");
    } else {
        res.send("登录失败");
    }
})

module.exports = router;