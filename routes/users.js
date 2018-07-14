var express = require('express');
var router = express.Router();
var UserController=require("../controllers/UserController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//
router.post("/login",UserController.login);
router.get("/logout",UserController.logout);
//用户注册路由，使用控制器中的register方法
router.post("/register",UserController.register);

router.get("/check",UserController.checkLogin);

//导出路由
module.exports = router;
