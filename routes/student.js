var express = require('express');
// var cookieParser=require('cookie-parser');
var request = require('request')
var router = express.Router();

// 跳转到学生首页
router.get('/', function (req, res, next) {
    res.render('student', {user: req.session.user});
})

router.post('/get_user_info', function (req, res, next) {
    let params = req.body;
    console.log(params)
    request.post({
        url: 'http://localhost:8080/server/user/user_info',
        form: {user_id: params.user_id}
    }, function (error, response, body) {
        // 返回的结果和 GET 一样
        if (!error && response.statusCode === 200) {
            let user = JSON.parse(body).data;
            if (req.session.role) {
                //ns
                user = {role: req.session.role, name: user.ns_name, tel: user.tel, email: user.email}
            } else {
                //student
                user = {
                    role: req.session.role,
                    name: user.stu_name,
                    tel: user.tel,
                    email: user.email,
                    addres: user.address
                }
            }
            res.send(user)
        } else {
            console.log(error)
            res.send('error')
        }
    })
})

module.exports = router;