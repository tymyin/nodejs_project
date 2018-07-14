/* 用户相关的控制器 */
// 引入用户模型模块
const UserModel = require("../models/UserModel");

const UserController = {
	//用户登录
	login : function(req,res,next){
		const {username, password} = req.body;
		//验证登录成功与失败
		UserModel.find({username,password},(data)=>{
			//在session中记录登录成功的用户名
			req.session.loginUser=data[0].username;
			
			if(data.length===1){
				res.json({//登录成功
					res_code:0,
					res_error:"",
					res_body:{username:data[0].username,email:data[0].email}
				});
			}else{
				res.json({//登录失败
					res_code:-2,
					res_error:"用户名失败",
					res_body:{}
				});
			}
		},(err)=>{
			res.json({//登录成功
				res_code:-1,
				res_error:err,
				res_body:{}
			});
		});
	},
	//退出功能
	logout:function(req, res, next){
		req.session=null;
		res.json({
			res_code:0,
			res_error:"",
			res_body:{}
		});
	},
	//判断用户是否登录
	checkLogin:function(req, res, next){
		var user=req.session.loginUser;
		if(user){
			res.json({
				res_code:0,
				res_error:"",
				res_body:{
					username:user
				}
			});
		}else{
			res.json({
				res_code:-1,
				res_error:"用户登录失效",
				res_body:{}
			});
		}
	},
	// 用户注册方法
	register : function(req, res, next){
		/*// 获取 get 请求传递的参数
		const {username, password, email} = req.query;*/
		// 获取 post 请求传递的参数。结构赋值方式从body主题中拿到数据
		const {username, password, email} = req.body;
		// 将数据保存到数据库，UserModel负责链接数据库
		UserModel.save({username, password, email}, (msg)=>{
			res.json({
				res_code : 0,
				res_error : "",
				res_body : msg
			});
		}, (err)=>{
			res.json({
				res_code : -1,
				res_error : err,
				res_body : {}
			});
		});
	},

	check : function(){}
};

// 导出用户控制器
module.exports = UserController;