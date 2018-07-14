const PositionModel=require("../models/PositionModel");
const PositionController = {
	//添加职位
	add:function(req, res, next){
		//post获取请求中传递的职位信息
		const {position,company,salary}=req.body;
		let logo="";
		if(req.file){
			logo="/upload/"+req.file.filename;
		}
		PositionModel.save({position,company,salary,logo},(data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			});
		},(err)=>{
			res.json({
				res_code:-1,
				res_erro:err,
				res_body:{}
			});
		});
	},
	list:function(req,res,next){
		//从请求中获取查询的页码		
		const {pageIndex}=req.query;
		PositionModel.findByPage(pageIndex,(data)=>{
			//data中放的是查询成功的数据
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			});
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			});
		});
	},
	//查询某条数据
	findOneData:function(req,res,next){
		const {upId}=req.query;
		PositionModel.findAData(upId,(data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			})
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			})
		});
	},
	//删除
	deldata:function(req,res,next){
		const {dataId}=req.query;		
		PositionModel.delPosition(dataId,(data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			})
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			})
		})
	},
	//修改
	updata:function(req,res,next){
		let info = {id,position,company,salary}=req.body;
		let logo="";
		if(req.file){
			logo="/upload/"+req.file.filename;
			info ={id,position,company,salary,logo};
		}
		PositionModel.updateNewData(info,(data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			})
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			})
		});
	}
};
module.exports=PositionController;