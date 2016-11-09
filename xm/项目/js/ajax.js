function ajax(method, url, data, success_method){ //success_method 函数 下载到数据以后处理数据的方法
			var xhr = null;
			try{
				xhr = new XMLHttpRequest();
			}catch(error){
				xhr = new ActiveXObject("Microsoft XMLHTTP");
			}
			if(method == "get" && data){
				url += "?" + data;
			}
			xhr.open(method, url, true);
			if(method == "get"){
				xhr.send();
			}else{
				xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
				xhr.send(data);
			}
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					//判断网络畅通接收数据 200
					if(xhr.status == 200){
						//处理该数据的函数
						success_method && success_method(xhr.responseText);
					}else{
						alert("出错了,Err: " + xhr.status);
					}
				}
			}
		}