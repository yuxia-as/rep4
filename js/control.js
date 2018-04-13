var btn_submit = document.getElementById('submit_choice');
var btn_register = document.getElementById('register');
var user_message = document.getElementById('user_message');
var btn_result = document.getElementById('btn_result');
var result_game = document.getElementById('result');

//use object to easily manipulate data 
var option_obj = {
	"0":"Rock",
	"1":"Scissor",
	"2":"Papper"
};

var model = {
	//suppose there are some raw data, may add more function to test sign up/log in ability
	data:[{
		"username":"serena",
		"email":"serena@gmail",
		"password":"1234",
		"game_result":[
			{
				"id":1,
				"res":{
					"You_selected":"Rock",
					"Computer_selected":"Papper",
					"Result":"You Lose!"
				}
			},
			{
				"id":2,
				"res":{
					"You_selected":"Rock",
					"Computer_selected":"Scissor",
					"Result":"You Win!"
				}
			},
			{
				"id":3,
				"res":{
					"You_selected":"Scissor",
					"Computer_selected":"Scissor",
					"Result":"Equal!"
				}
			}
		]
	}],
	//get user id by name to save data under this name
	getUserId:function(username){
		for(var i=0;i<this.data.length;i++){
			if(username==this.data[i].username){
				return i;
			}
		}
	},
	//get auto data id
	getMaxid:function(i){
		if(this.data[i].game_result.length==0){
			maxId = 0;
		}else{
			var maxId = this.data[i].game_result[0].id;
			for(var j=1;j<this.data[i].game_result.length;j++){
				if(maxId<this.data[i].game_result[j].id){
					maxId = this.data[i].game_result[j].id;
				}	
			}
		}
		
		return maxId;
	},
	//add meta data first
	addMetaData:function(username,email,password){
		var obj = {
			"username":username,
			"email":email,
			"password":password,
			"game_result":[]
		}
		this.data.push(obj);
	},
	//add game result under correct meta data
	addResData:function(name,res_obj){
		//console.log(name==this.data[1].username);
		var i = this.getUserId(name);
		var id=this.getMaxid(i)+1;
		this.data[i].game_result.push({"id":id,"res":res_obj});
	},
	//query data based on name
	returnData:function(name){
		var i = this.getUserId(name);
		return this.data[i].game_result;
	}
}

var controller={
	//send meta data out to model
	addMetaData: function(username,email,password){
		model.addMetaData(username,email,password);
	},
	//reserve the game before sign up
	checkMetaData:function(name){
		if(name==""){
			return false;
		}else{
			return true;
		}
		
	},
	//update game pics and selected information
	getNew:function(yourChoice,comChoice){
		getNew(yourChoice,comChoice);
	},
	////calculate game result
	compare_res:function(yourChoice,comChoice){
		return compare(yourChoice,comChoice);
	},
	//send result data to model
	addResData:function(name,yourChoice,comChoice){
		var res = this.compare_res(yourChoice,comChoice);
		var res_obj = {
			"You_selected":option_obj[yourChoice],
			"Computer_selected":option_obj[comChoice],
			"Result":res
		};
		model.addResData(name,res_obj);
	},
	//return queried data to browser
	showData:function(name){
		
		var data = model.returnData(name);
		showResult(data);
	}
}


function getNew(yourChoice,comChoice){
	var selectMsg = document.getElementById('selected');
	var yourImg = document.getElementById('you_img');
	var comImg = document.getElementById('com_img');
	selectMsg.innerHTML = option_obj[yourChoice];
	yourImg.src = "images/"+yourChoice+".jpg";
	comImg.src = "images/"+comChoice+".jpg";
}

function compare(yourChoice,comChoice){
	yourChoice=parseInt(yourChoice);
	comChoice = parseInt(comChoice);

	if(yourChoice==comChoice){
		//console.log("yes");
		 return ("Tie!");
	}else if(yourChoice==0 && comChoice==2){
		return ("You Lose!");
	}else if(yourChoice==2 && comChoice==0){
		return ("You Win!");
	}else if(yourChoice<comChoice){
		return ("You Win!");
	}else{
		return("You Lose！");
	}
}

function showResult(data){
	var res_str = "<table><tr><th>Result Id</th><th>You Selected</th><th>Computer Selected</th><th>Game Result</th></tr>";
	for(var i=0;i<data.length;i++){
		res_str += "<tr><td>"+data[i].id+"</td><td>"+data[i].res.You_selected+"</td><td>"+data[i].res.Computer_selected+"</td><td>"+data[i].res.Result+"</td></tr>";
	}
	 res_str += "</table>";
	 result_game.innerHTML = res_str;
}

btn_register.onclick = function(){
	var username = document.getElementById('name').value;
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	if(username=="" || email==""){
		user_message.innerHTML = "Please fill up all register area";
	}else{
		user_message.innerHTML = "Dear \""+username+"\", welcome to play this GAME!";
		controller.addMetaData(username,email,password);
	}
};


btn_submit.onclick = function(){
	var str = user_message.innerText;
	var name = str.substring(str.indexOf("\"")+1,str.lastIndexOf("\""));

	var on = controller.checkMetaData(name);
	if(on){
		var yourChoice = document.getElementById('you_select').value;
		var comChoice = Math.floor(Math.random()*3);
		var res_message = document.getElementById('res_message');
		controller.getNew(yourChoice,comChoice);
		res_message.innerHTML = controller.compare_res(yourChoice,comChoice);
		controller.addResData(name,yourChoice,comChoice);
		btn_result.style.display = "block";

	}else{
		user_message.innerHTML = "Please Sign Up Here";
	}	
}

btn_result.onclick = function(){
	var str = user_message.innerText;
	var name = str.substring(str.indexOf("\"")+1,str.lastIndexOf("\""));
	result_game.style.display = "block";
	controller.showData(name);
}






