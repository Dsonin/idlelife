
var stamina = 100;
var money = 500;
var cred = 50;
var wage = 8;
var shift = 8;
var social = 3;
var happiness = 50;
var sleep = 8;
var code = 0;
var codeTotal = 0;
var sleepCounter = 0;
var timer=0;

function update(){
    document.getElementById("stamina").innerHTML=stamina.toString();
    document.getElementById("money").innerHTML=money.toString();
    document.getElementById("cred").innerHTML=cred.toString();
    document.getElementById("social").innerHTML=social.toString();
    document.getElementById("happiness").innerHTML=happiness.toString();
    document.getElementById("sleep").innerHTML=sleep.toString();
    document.getElementById("code").innerHTML=code.toString();
    document.getElementById("codeTotal").innerHTML=codeTotal.toString();
    document.getElementById("shift").innerHTML=shift.toString();
};


function alertMessage(message){
	document.getElementById("alert-message").innerHTML=message;
	$("#alert-message").fadeIn(400);
	$("#alert-message").fadeOut(2000);
};
function alertWarning(message){
	document.getElementById("alert-warning").innerHTML=message;
	$("#alert-message").fadeIn(400);
};

setTimeout(function sleepButton(){
	$("#sleep-btn").fadeIn(2000);
}, 5000);
//make it so that if you miss too much sleep you get fucked up.

function work(number){
	if (stamina > 0 && stamina - shift >= 1){
	money = money + wage*shift;
	stamina = stamina - shift;
	happiness = happiness--;
	update();
	} else {
		alertMessage("You need to sleep.");
	};
};

window.setInterval(function(){
		timer = timer+1;
		document.getElementById("timer").innerHTML=(timer/60).toFixed(2);
}, 1000)

//because it wouldn't fucking work with rest or sleep so fuck. fuck everything! It's the sleep button.
function fuckMe(number){
	stamina = stamina + 8;
	happiness = happiness + 5;
	$("#sleep-btn").fadeOut(200);
	update();
	setTimeout(function sleepButton(){
	$("#sleep-btn").fadeIn(2000);
	}, 5000);
	alertMessage("That was a nice rest!");
};

window.setInterval(function sadness(){
	happiness=happiness-5;
	document.getElementById("happiness").innerHTML=happiness;
	if (happiness === 10){
		alertMessage("Are you okay?");
	};
	if(happiness < 1){
		alertMessage("I think they call this depression...");
	};
}, 10000)

function makeCode(number){
		if (code < 9){
		code++;
		update();
	}else{
		codeTotal=codeTotal++;
		cred++;
		code=code-code;
		update();
	}
};

function study(number){
	if (stamina > 4){
		cred=cred+number;
		stamina=stamina-4;
		update();
	}else{
		alertMessage("You're too tired to study.");
	}
};

function drink(number){
	if(stamina>0 && money>4){
		cred=cred - Math.floor(Math.random()*4);
		money=money - Math.floor(Math.random()*16);
		stamina=stamina + (5-Math.floor(Math.random()*10));
		happiness=stamina + (5-Math.floor(Math.random()*6));
		update();
		if (stamina < 0){
			alertMessage("You drank yourself to death...");
		}
	}else{
		alertMessage("Welp, looks like you passed out.")
	};
};//put a switch in here for some fuuuuns

