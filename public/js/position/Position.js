function Position(){
	this.loadHeader();
	this.addListener();
	this.check();
}
$.extend(Position.prototype,{
	check:function(){
		$.get("/api/users/check",(data)=>{
			if(data.res_code===-1){
				location="/index.html";
			}else{
				//默认查询第一页职位数据
				this.listByPage(1);
			}
		},"json");
	},
	loadHeader:function(){
		//创建头部对象
		new Header();
		$("#position-nav ul:first li:last").addClass("active").siblings().removeClass("active");
	},
	//注册事件监听
	addListener:function(){
		$(".btn_add_pos").on("click",this.handleAddPostion);
		//点击页码查询该也信息
		const that=this;
		$(".pagination").on("click","li",function(){
			//获取当前点击的页码
			const currentPage=$(this).find("a").text();
			//调用listByPage()查询
			that.listByPage(currentPage);
		});
		//点击删除
		$(".tabBody").delegate(".btn_del","click",function(){			
			const htmlDataId=$(this).parents("tr").attr("data-del");
			that.deldatas(htmlDataId);			
		});
		//点击每条数据后面修改按钮
		$(".tabBody").delegate(".btn_update","click",function(){
			const htmlUpdata=$(this).parents("tr").attr("data-del");
			console.log(htmlUpdata);
			that.handleUpPostion(htmlUpdata);			
		});
		//点击添加按钮，将修改的数据进行提交
		$(".btn_up_pos").on("click",this.handleUpNewdata);
	},
	//处理添加职位的方法
	handleAddPostion:function(){
//		const that=this;
		//创建FormData，$(".add_pos_form").get(0)参数获取指定的表单add_pos_form以及表单内的数据
		var formData =new FormData($(".add_pos_form").get(0));
		//ajax请求
		$.ajax({
			type:"post",
			url:"/api/positions/add",
			data:formData, //向服务器传递的数据
			processData:false, //不需要将data转换为查询字符串
			contentType:false, //不设置content-type头
			dataType : "json",
			success:function(data){
				if(data.res_code===0){//成功时候隐藏模态框
					$("#addPosModal").modal("hide");
					alert("添加成功");
					location.reload();
//					that.listByPage(1);
				}else{//不成功的时候讲错误信息显示
					$(".add_pos_error").removeClass("hide");
				}
			}
		});
		
//请求路径
//		$.post("/api/positions/add",$(".add_pos_form").serialize(),function(data){
//			if(data.res_code===0){//成功
//				$("#addPosModal").modal("hide");
//			}else{
//				$(".add_pos_error").removeClass("hide")
//			}
//		},"json");
	},

	//按页查询职位数据并渲染
	listByPage:function(currentPage){
		//如果没有页码，默认查询第一页
		currentPage=currentPage||1;
		$.get("/api/positions/list",{pageIndex:currentPage},function(data){
			if(data.res_code===0){
				const html=template("position_list_temp",{list:data.res_body});
				$(".pos_tab tbody").html(html);
			}
		},"json");
	},
	//删除
	deldatas:function(htmlDataId){
		$.get("/api/positions/deldata",{dataId:htmlDataId},function(data){
			if(data.res_code===0){
				alert("删除成功");
				location.reload();
			}
		},"json");
	},
	//查询点击该条后的修改按钮获取该条数据
	handleUpPostion:function(htmlUpdata){
		$.get("/api/positions/findOneData",{upId:htmlUpdata},function(data){
			console.log(data);
			
			
			if(data.res_code===0){
				$("#upPosId").val(data.res_body._id);
				$("#upPosLogo").attr("accept",data.res_body.logo);				
				$("#upPosName").val(data.res_body.position);
				$("#upPosCompany").val(data.res_body.company);
				$("#upPosSalary").val(data.res_body.salary);
			};
		},"json");
	},
	//修改数据
	handleUpNewdata:function(){
//		const that=this;
		//创建FormData，$(".add_pos_form").get(0)参数获取指定的表单add_pos_form以及表单内的数据
		var formData =new FormData($(".up_pos_form").get(0));
		//ajax请求
		$.ajax({
			type:"post",
			url:"/api/positions/updata",
			data:formData, //向服务器传递的数据
			processData:false, //不需要将data转换为查询字符串
			contentType:false, //不设置content-type头
			dataType:"json",
			success:function(data){
				if(data.res_code===0){//成功时候隐藏模态框
					$("#upPosModal").modal("hide");
					alert("修改成功");
//					that.listByPage(1);
					location.reload();
				}else{//不成功的时候讲错误信息显示
					$(".up_pos_error").removeClass("hide");
				}
			}
		});
	}
});

new Position();