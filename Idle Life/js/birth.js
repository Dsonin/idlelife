
//setting primary stats that will affect growth rate
window.onload=function getBorn(){
	var luck = Math.ceil(Math.random()*6);
	var iQ = 0;
	var intelligence = 0;
    function iQget(variable){
		while (variable === 0){
			variable = Math.random();
		}
    iQget(iQ);
    };
    console.log(iQ);
    window.setInterval( function(){
		if (iQ < 0){
	    intelligence+=intelligence*iQ;
	    }else{
	    	iQget(iQ);
	    }
	    }, 1000)
    console.log(intelligence);
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

