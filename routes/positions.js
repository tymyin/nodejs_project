var express = require('express');
var router = express.Router();
var PositionController=require("../controllers/PositionController");
//文件上传
var multer  = require('multer')
var storage = multer.diskStorage({
	//保存到磁盘的目标位置
  destination: function (req, file, cb) {
    cb(null, './public/upload')//将上传文件保存到public文件夹下面的upload文件夹里
  },
  //保存文件的文件名规则，field字段
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(file.originalname.lastIndexOf(".")));
  }
});
 //创建上传实例
var upload = multer({ storage: storage });


/* GET users listing. */
//get方式请求add资源，添加职位信息
router.post('/add',upload.single('logo'), PositionController.add);
//查询职位
router.get('/list',PositionController.list);
//删除职位
router.get('/deldata',PositionController.deldata);
//查询某条数据
router.get('/findOneData',PositionController.findOneData);
//修改
router.post('/updata',upload.single('logo'),PositionController.updata);
//导出路由
module.exports = router;
