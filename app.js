var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var log4js=require("log4js");

// 路由
var indexRouter = require('./routes/index');
var loginRouter=require('./routes/login');
var agentRouter=require('./routes/agent');
var schoolRouter=require('./routes/school');
var studentRouter=require('./routes/student');
var searchRouter=require('./routes/search5');
var eventRouter=require('./routes/event6');
var createRouter=require('./routes/create8');
var baiduRouter=require('./routes/baidutest')
var firstRouter=require('./routes/firstpage');
var login1Router=require('./routes/login1');
var registerRouter=require('./routes/register');
var tongjiRouter=require('./routes/tongjitest');
var personRouter=require('./routes/personal');
var researchRouter=require('./routes/research');
var helpRouter=require('./routes/help');
var alterRouter=require('./routes/alter');
var msgRouter=require('./routes/message');
var AlterMsgRouter=require('./routes/alterMsg');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 静态资源路径
app.use(express.static(path.join(__dirname, 'public')));
// 门户首页
app.use('/', indexRouter);

app.use(session({
  secret: 'xybl',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
  name:'session_id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
  resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
  saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
  cookie: {
    maxAge:30*60*1000    /*过期时间*/
  },   /*secure https这样的情况才可以访问cookie*/
  //设置过期时间比如是30分钟，只要游览页面，30分钟没有操作的话在过期
  rolling:true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
}))

/**
 * 拦截器：登录拦截
 */
app.use(function (req, res, next) {
  var log = log4js.getLogger("intercept");
  if (req.session.userid) {
    //用户登录过
    next();
  } else {
    //解析用户请求路径
    var arr = req.url.split('/');
    console.log(arr);
    log.info('请求路径拆分：' + JSON.stringify(arr));
    //去除get请求携带的参数
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('?')[0];
    }
    if (arr.length > 1) {
      if (arr[1] === 'login1'||arr[1] === 'register') {
        next();
      } else {
        log.error('intercept：用户未登录执行登录拦截，路径为：' + arr[1]);
        res.redirect('/login1');  // 将用户重定向到登录页面
        res.end();
      }
    }
  }
});

app.use('/login', loginRouter);
app.use('/agent',agentRouter);
app.use('/school',schoolRouter);
app.use('/student',studentRouter);
app.use('/search',searchRouter);
app.use('/event',eventRouter);
app.use('/create',createRouter);
app.use('/baidutest',baiduRouter);
app.use('/firstpage',firstRouter);
app.use('/login1',login1Router);
app.use('/register',registerRouter);
app.use('/tongji',tongjiRouter);
app.use('/personal',personRouter);
app.use('/research',researchRouter);
app.use('/help',helpRouter);
app.use('/alter',alterRouter);
app.use('/message',msgRouter);
app.use('/alterMsg',alterRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

module.exports = app;
