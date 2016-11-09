//1.获取对象节点
function $(str){
			var newStr = str.substring(0, 5);
			if(newStr == "name="){
				return document.getElementsByName(str.substring(5, str.length));
			}else{
				if(str[0] == "#"){
					return document.getElementById(str.substring(1, str.length));
				}else if(str[0] == "."){
					return document.getElementsByClassName(str.substring(1, str.length));
				}else{
					return document.getElementsByTagName(str);
				}
			}

		}
//2.随机颜色
function randomColor(){
	var color = "rgba(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255)	+ "," + Math.round(Math.random() * 255) + ",1)";
	return color;
}
//3.获取指定节点的的style属性
function getStyle(element, style){
	return element.currentStyle ? element.currentStyle[style] : getComputedStyle(element)[style];
}
//4.1消除空白节点
function removeSpaceNode2(node){
	for(var i = 0; i < node.childNodes.length; i++){
		if(node.childNodes[i].nodeType == 3 && /^\s+$/.test(node.childNodes[i].nodeValue)){
			node.removeChild(node.childNodes[i]);
		}
	}
}
//4.2直接删除掉该空白节点
function removeSpaceNode1(nodes){
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
			nodes[i].parentNode.removeChild(nodes[i]);
		}
	}
}
//4.3剔除空白节点 传入所有的子节点进行处理
function removeSpaceNode(nodes){
			//将不是空白节点节点插入到新数组中
	var newArr = [];
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
			continue;
		}else{
			newArr.push(nodes[i]);
		}
	}
			//返回剔除掉空白节点的数组
	return newArr;
}
//5.在某节点后添加新节点
function insertAfter(newElement, oldElement){
//如果oldElement不是最后一个节点,插入到oldElement的后一个节点之前
//否则如果oldElement是最后一个节点,直接插入到当前节点列表的末尾
	var parentNode = oldElement.parentNode;
	if(oldElement == parentNode.lastChild){
		parentNode.appendChild(newElement);
	}else{
		parentNode.insertBefore(newElement, oldElement.nextSibling);
	}
}
//6.创建类型为type内容为text的新节点
function createNodeWithText(type, text){
	var node = document.createElement(type);
//判断当前文本是否存在
	if(text){
		var textNode = document.createTextNode(text);
		node.appendChild(textNode);
	}
	return node;
}
//7.时间按指定方式显示
function exchange(date) {
	var year = date.getFullYear() ;
	var mon = date.getMonth() ;
	var dat = date.getDate()  ;
	var day = date.getDay()  ;
	var hours = date.getHours()  ;
	var min = date.getMinutes();
	var sec = date.getSeconds()  ;
	return (year + '年' + mon + '月' + dat + '日' + ' ' + '星期' + day + ' ' + hours + ':' + min + ':' + sec );
}
//8.拖拽效果		
function drag(node_id,title_id){
	var node = document.getElementById(node_id);
	var node_title = document.getElementById(title_id);
	//设置一个指示器,当按下鼠标的时候,变成true,当松开鼠标的时候,变成false
	//声明两个变量,记录鼠标和块左上角的相对位置
	var isYes = false;
	var offsetX = 0;
	var offsetY = 0;
	node_title.onmousedown = function(even){
		isYes = true;
		var e = even || window.event;
		offsetX = e.clientX - parseInt(getStyle(node, "left"));
		offsetY = e.clientY - parseInt(getStyle(node, "top"));

	}
	document.onmousemove = function(even){
		var e = even || window.event;
		if(isYes){
			node.style.left = (e.clientX - offsetX) + "px";
			node.style.top = (e.clientY - offsetY) + "px";
		}
	}
//松手的时候,要将isYes设为false
	node_title.onmouseup = function(){
		isYes = false;
	}
}
//9.获取n天后的时间
function getDate(n){
	var date = new Date();
	var day = date.getDate();
	date.setDate(day + n);
	return date;
}
//10.添加cookie
function setCookie(name, value, expires, path, domain, isSecure){
	var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value); //进行cookie的拼接
	if(expires){
		cookieText += ";expires=" + expires;
	}
	if(path){
		cookieText += ";path=" + path;
	}
	if(domain){
		cookieText += ";domain=" + domain;
	}
	if(isSecure){
		cookieText += ";secure";
	}
	document.cookie = cookieText;
}
//11.获取cookie
function getCookie(name){
	var cookieText = decodeURIComponent(document.cookie);
	var start = cookieText.indexOf(name + "=");
	if(start == -1){
		return "没有该键";
	}else{
		var end = cookieText.indexOf(";", start);
		if(end == -1){
		end = cookieText.length;
		}
		var value = cookieText.substring(start, end);
		var arr = value.split("=");
		return arr[1];
	}	
}
//12.移除cookie
function removeCookie(name){
	document.cookie = encodeURIComponent(name) + "= ;expires=" + new Date(0);
}
//13.n位验证码
function testCode(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var num = parseInt(Math.random() * 100);
		if(num >= 0 && num <= 9){
			arr.push(num);
		}else if(num >= 10 && num <= 25){
			arr.push(String.fromCharCode(num + 87));
		}else if(num >= 65 && num <= 90){
			arr.push(String.fromCharCode(num));
		}else{
			i--;
		}
	}
	return arr.join("");
}
//14.事件绑定添加事件
function addEvent(obj, type, func){
	if(obj.addEventListener){
		obj.addEventListener(type, func, false);
	}else if(obj.attachEvent){
		obj.attachEvent("on" + type, func);
	}
}
//15.事件绑定删除事件
function removeEvent(obj, type, func){
	if(obj.removeEventListener){
		obj.removeEventListener(type, func);
	}else if(obj.detachEvent){
		obj.detachEvent("on" + type, func);
	}
}






