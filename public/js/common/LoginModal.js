function LoginModal(){
	this.createDom();
	this.addListener();
}

LoginModal.template=`<div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
	        <h4 class="modal-title" id="loginModalLabel">用户登录</h4>
	      </div>
	      <div class="modal-body">
	      <div class="alert alert-danger hide login_error" role="alert">用户登录失败,请稍后重试...</div>
	        <form class="login_form">
			  <div class="form-group">
			    <label for="exampleInputEmail1">用户名</label>
			    <input type="email" class="form-control" name="username" id="loginUsername" placeholder="用户名">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword1">密码</label>
			    <input type="password" class="form-control" name="password" id="loginPassword" placeholder="密码">
			  </div>			  			  
			</form>
	      </div>
	      <div class="modal-footer">	        
	        <button type="button" class="btn btn-primary btn_login">登录</button>
	      </div>
	    </div>
	  </div>
	</div>`;
$.extend(LoginModal.prototype,{
	createDom:function(){
		$(LoginModal.template).appendTo("body");
	},
	//添加事件监听
	addListener:function(){
		$(".btn_login").on("click",this.handleLogin);
	},
	handleLogin:function(){
		$.post("/api/users/login",$(".login_form").serialize(),function(data){
			if(data.res_code===0){
				$(".login_success").removeClass("hide").prev("ul").hide();
				$(".login_success a:first").text("欢迎您："+data.res_body.username)
				$("#loginModal").modal("hide");
			}else{
				$(".login_error").removeClass("hide");
			}
		},"json");
	}
});