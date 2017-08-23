window.onload = function(){

	//获取class名
	var oNode = document.getElementsByTagName('ul')[0];
	var aNo = getElementsByClassName(oNode,"text"); 
	alert(aNo.length);

	function getElementsByClassName(node,className){

		//如果支持getElementsByClassName使用原生
		if(node.getElementsByClassName){
			return node.getElementsByClassName(className);
		}

		//不支持getElementsByClassName执行以下代码
		var aNode = node.getElementsByTagName('*');
		var arr = [];
		for(var i = 0;i<aNode.length;i++){
			if(aNode[i].className.indexOf(className)!=-1){
				arr[arr.length] = aNode[i];
			}
		}
		return arr;
	}

	//获取css中的属性值
	function getStyle(ele,attr){
		if(window.getComputedStyle){
			return window.getComputedStyle(ele,false)[attr];
		}else{
			return ele.currentStyle[attr];
		}
	}


	//左右移动
	var time = null;
	var speed = null;
	function move(elem,itarget){
		clearInterval(time);
		time = setInterval(function(){
		speed = (itarget-elem.offsetLeft)/20;
			if(speed>0){
				speed = Math.ceil((itarget-elem.offsetLeft)/20);
			}else{
				speed = Math.floor((itarget-elem.offsetLeft)/20);
			}
			if(parseInt(elem.style.left)==itarget){
				elem.style.left = itarget + "px";
				clearInterval(time);
			}else{
				elem.style.left = elem.offsetLeft + speed + "px";
			}
		}, 30)
	}


	//事件监听
	function listener(ele,eve,handler){
		if(ele.attachEvent){
			ele.attachEvent("on"+eve,handler,false);
		}else{
			ele.addEventListener(eve,handler,false);
		}
	}

	//cookies
	function setCookie(name,value,iday){
		var oDate = new Date();
		oDate.setDate(oDate.getDate()+iday);	
		document.cookie = name + '=' + value+";expires="+oDate.toUTCString(); 
	}

	function removeCookie(name){
		setData(name,1,-1)
	}

	function getCookie(name){
		var arr1 = document.cookie.split('; ');
		
		for(var i=0;i<arr1.length;i++){
			var arr2 = arr1[i].split('=');
			if(arr2[0]==name){
				return arr2[1];
			}
		}
		return '';
	}


	//ajax
	function ajax(option){
		var type = option.type||'get';
		var url = option.url;
		var async = option.async||true;
		var success = option.success;

		var xml = null;
		if(window.XMLHttpRequest){
			xml = new XMLHttpRequest();
		}else{
			xml = new ActiveXobject("Microsoft.XMLHttp");
		}
		xml.open(type,url,async);

		xml.send();

		xml.onreadystatechange = function(){
			if(xml.readyState==4){
				if(xml.status == 200){
					var body = JSON.parse(xml.responseText);
					success&&success(body);
				}else{
					alert(xml.status);
				}
			}
		}
	}
}
