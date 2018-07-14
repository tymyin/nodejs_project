var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession=require("cookie-session");
//路由中间件
var usersRouter = require('./routes/users');

//职位路由
var positionsRouter=require("./routes/positions");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//使用cookie路由中间件
app.use(cookieSession({
	name:"session",
	secret:"cookiesessionname",
	maxAge:15*60*1000
}));
//使用添加用户路由中间件
app.use('/api/users', usersRouter);//请求api目录下的users子目录中资源
//使用添加职位信息的路由中间件
app.use("/api/positions",positionsRouter);//请求api目录下的users子目录中资源
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

module.exports = app;