//引入mongoose模块
const mongoose=require("mongoose");
//连接数据库
mongoose.connect("mongodb://loaclhost:27017/position_project");
const schema=mongoose.Schema({
	position:String,
	company:String,
	salary:Number,
	logo:String
});
const Position=mongoose.model("position",schema);

const PositionModel={
	//保存职位到数据库中,data数据是保存成功的职位信息数据
	save:function(positionInfo,success,error){
		const pos=new Position(positionInfo);
		pos.save((err,data)=>{
			if(err){
				error(err);
				return;
			}
			success(data);
		});
	},
	//按页查询
	findByPage:function(pageIndex,success,error){
		//每页5条
		const pageSize=5;
		//跳过（pageSize-1）*pageSize条文档数据，限定查询pageSize条文档数据
		Position.find()
		.limit(pageSize)
		.skip((pageIndex-1)*pageSize)
		.then(success,error);
		
	},
	//查询指定的一条数据
	findAData:function(upId,success,error){
		Position.findById(upId).then(success,error);
	},
	//修改职位数据,upPosition是一个对象
	updateNewData:function(upPosition,success,error){
		Position.update({_id:upPosition.id}, {$set:upPosition}, (err,data)=>{
			if(err){
				error(err);
				return
			}
			success(data);

		})
	},
	//删除
	delPosition:function(dataId,success,error){		
		Position.findByIdAndRemove(dataId).then(success,error);
	}
}
//导出模型
module.exports=PositionModel;