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
    $("#stamina").html(stamina);
    $("#money").html(money);
    $("#cred").html(cred);
    $("#wage").html(wage);
    $("#social").html(social + " friends");
    $("#happiness").html(happiness);
    $("#sleep").html(sleep);
    $("#code").html(code);
    $("#codeTotal").html(codeTotal);
    $("#shift").html(shift);
};


function alertMessage(message){
	$("#alert-message").html(message);
	$("#alert-message").fadeIn(400);
	$("#alert-message").fadeOut(2000);
};
setTimeout(function sleepButton(){
	$("#sleep-btn").fadeIn(2000);
}, 5000);
//make it so that if you miss too much sleep you get fucked up.

function work(){
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
		$("#timer").html((timer/60).toFixed(2));
}, 1000)

//because it wouldn't fucking work with rest or sleep so fuck. fuck everything! It's the sleep button.
function fuckMe(){
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
	$("#happiness").html(happiness);
	if (happiness === 10){
		alertMessage("Are you okay?");
	};
	if(happiness < 1){
		alertMessage("I think they call this depression...");
	};
}, 10000)

function makeCode(){
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

function study(){
	if (stamina > 4){
		cred=cred++;
		stamina=stamina-4;
		update();
	}else{
		alertMessage("You're too tired to study.");
	}
};

function drink(){
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

//being born
//setting primary stats that will affect growth rate
function getBorn(){
	var luck = Math.ceil(Math.random()*6);
	var iQ = Math.ceil(Math.random()*6);
    console.log(iQ);
    var newName = prompt("What is your name?");
    function blank(number){
	    switch (number){
		case 0:
		    newName = "Derek";
		    break;
		case 1:
			newName = "Derek2";
			break;
		case 2:
		case 3:
		case 4:
		case 5:
		    newName = "Stormageddon";
			break;
		case 6:
		    newName = "Derek23";
			break;
		case 7:
			newName = "Derek101";
			break;
		case 8:
		    newName = "Derek3";
			break;
		case 9:
		    newName = "Derek4";
			break;
		default:
			newName = "Derek5";
		    break;
	    }
	    console.log(newName);
    }
    function birth(){
	    if (newName === "" || newName === null){
		    blank(Math.floor(Math.random()*11));
		    alertMessage("You are born...." + newName);
	    }else{
		    alertMessage("You are born...." + newName);
	    }
    };
    birth();
};

//actual game!

$(document).ready( function(){
	update();
	getBorn();
	$("#study").on("click", function(){
		study();
	});

});