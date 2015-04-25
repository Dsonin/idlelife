//changelog: created independent files for buttons so that we don't have to migrate to jQuery and can use pure javascript w/o wasting time
//           migrating stats to objects in order to easily manipulate multipliers v.0.5.0

// Variables
    var newName;
    var stamina = 100;
    var money = 0;
    var cred = 0;
    var wage = 0;
    var shift = 8;
    var happiness = 50;
    var code = 0;
    var codeTotal = 0;
    var sleepCounter = 0;
    var timer = 0;
    var sleepTime = 8;
    var intelligence = 0;
    var iQ = Math.ceil(Math.random() * 5);
    var sit = false;
    var walk = false;
    var talk = false;
    var school = false;
    var luck = Math.ceil(Math.random() * 11);
    var happinessBase = 1;
    var sadnessBase = 1;
    var social = Math.floor((iQ * luck) / 10);
    var meal = 10;
    var appetite = 1;
    var hungry = 0;
    var food = 100;

function update() {
    $("#userName").html(newName);
    $("#stamina").html(stamina);
    $("#money").html(money);
    $("#cred").html(cred);
    $("#wage").html(wage);
    $("#social").html(social.toFixed(0));
    $("#happiness").html(happiness.toFixed(2));
    $("#sleep").html(sleepTime);
    $("#code").html(code);
    $("#codeTotal").html(codeTotal);
    $("#shift").html(shift);
    $("#intelligence").html(intelligence.toFixed(2));
    $("#iq").html(iQ.toFixed(2));
    $("#hunger").html(hungry);
}


function alertMessage(message) {
    $("#alert-message").prepend("<p>"+message+"</p>");
    $("#alert-message").slideDown(400);
}

//make it so that if you miss too much sleep you get fucked up.


//The nitty gritty grind of life (working/sleeping/resettng stuff so as not to die)
function eat() {
    if (hungry < 101 && hungry > meal) {
        food = food - meal;
        happiness++;
        stamina++;
        hungry = hungry - meal;
        update();
    } else {
        alertMessage("You're full!");
    }
}

function sleepButton() {
    setTimeout(function () {
        $("#sleep-btn").slideDown(2000);
    }, 5000);
}

function work() {
    if (stamina > 0 && stamina - shift >= 1) {
        money = money + wage * shift;
        stamina = stamina - shift;
        happiness = happiness--;
        update();
    } else {
        alertMessage("You need to sleep.");
    }
}


//because it wouldn't fucking work with rest or sleep so fuck. fuck everything! It's the sleep button.
function sleep() {
    stamina = stamina + sleepTime;
    happiness = happiness + 5;
    $("#sleep-btn").fadeOut(200);
    update();
    sleepButton();
    alertMessage("That was a nice rest!");
}

//Mood modifiers/Counters todo: migrate all tickers into one function since, apparently, they can't run concurrently
function aging() {
    window.setInterval(function () {
        timer = timer + 1;
        $("#timer").html((timer / 100).toFixed(2));
    }, 1000);
}

function hunger() {
    window.setInterval(function () {
        hungry = hungry + appetite;
        $("#hunger").html(hungry);
    }, 1000);
}

function sadness() {
    window.setInterval(function () {
        happiness = happiness-sadnessBase;
        $("#happiness").html(happiness);
        if (happiness === 10) {
            alertMessage("Are you okay?");
        }
        if (happiness < 1) {
            alertMessage("I think they call this depression...");
        }
    }, 10000);
}

function happinessCounter() {
    window.setInterval(function () {
        happiness = happiness+happinessBase;
        $("#happiness").html(happiness);
    }, 10000);
}

function intelligenceCounter() {
    window.setInterval(function () {
        intelligence = intelligence + iQ;
        update();
    }, 2000);
}

//Hobbies
function makeCode() {
    if (code < 9) {
        code++;
        update();
    } else {
        codeTotal = codeTotal++;
        cred++;
        code = code - code;
        update();
    }
}

//earning intelligence points
function study(credit, intel, multiplier, tiredMessage) {
    if (stamina > multiplier) {
        cred = cred + credit;
        stamina = stamina - multiplier;
        intelligence = intelligence + intel;
        update();
    } else {
        alertMessage("You're too tired to " + tiredMessage + ".");
    }
}

//Having some fun!
function makeFriends() {
    var newFriends = Math.floor(Math.random() * luck);
    social = social + newFriends;
    update();
    alertMessage("You made " + newFriends + " new friends!");
    $("#makeFriends").slideUp();
    setTimeout(function () {
        $("#makeFriends").slideDown();
    }, 10000);
}

function drink() {
    if (stamina > 0 && money > 4) {
        cred = cred - Math.floor(Math.random() * social);
        money = money - Math.floor(Math.random() * 16);
        stamina = stamina + (5 - Math.floor(Math.random() * 10));
        happiness = stamina + (5 - Math.floor(Math.random() * 6));
        update();
        if (stamina < 0) {
            alertMessage("You drank yourself to death...");
        }
    } else {
        alertMessage("Welp, looks like you passed out.");
    }
} //put a switch in here for some fuuuuns

//intelligence upgrades

function intelUp(number, multiplier, upgradeMessage) {
    if (intelligence > number) {
        iQ = Math.pow(iQ, 1.05) * multiplier;
        alertMessage("You learned to " + upgradeMessage + ".");
    } else {
        alertMessage("You're not smart enough, yet. You need " + (number + 1) + " intelligence to learn this skill");
    }
}

//school 

function elementary() {
    $("#elementary").on("click", function () {
        if (timer > 120 && sit === true && walk === true && talk === true) {
            iQ = Math.pow(iQ,1.1);
            update();
            $(this).fadeOut();
            $("#study").fadeIn();
            console.log("why isnt this working");
            sadness();
            alertMessage("You've started school! Happiness is no longer a given.");
        } else {
            console.log("ksdjfhkshg");
            alertMessage("You're still too young");
        }
    });
}
function highSchool() {
    $("#highSchool").on("click", function () {
        if (timer >  500 && sit === true && walk === true && talk === true) {
            iQ = Math.pow(iQ,1.2);
            update();
            $(this).fadeOut();
            $("#team").fadeIn(); // join a sports team, social up, stamina up
            $("#club").fadeIn(); //join a club. social goes up, and so does intelligence/iq
            $("#band").fadeIn(); //join a band. social dependent on luck. 
            $("#work").fadeIn(); //get a job. 
            console.log("why isnt this working");
            sadness();
            alertMessage("You've started high school! Time to decide what kind of person you'll become!");
        } else {
            alertMessage("You're still too young");
        }
    });
}


//being born
//setting primary stats that will affect growth rate
function birth() {
    newName = prompt("What is your name?");
    if (newName === "" || newName === null) {
        blank(Math.floor(Math.random() * 11));
        alertMessage("You are born...." + newName);
    } else {
        alertMessage("You are born...." + newName);
    }

    function blank(number) {
        switch (number) {
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
        $("#userName").html(newName);
    }
    $("#userName").html(newName);
}

function getBorn() {
    birth();
    happinessCounter();
    intelligenceCounter();
    aging();
    sleepButton();
    update();
    $("#gamewindow").slideDown();
    $("#yourInfo").slideDown();
}



//actual game!

//Hiding buttons we don't need yet
$("#play").hide();
$("#study").hide();
$("#makeFriends").hide();
$("#eat").hide();
$("#yourInfo").hide();
$("#gamewindow").hide();
$("#work").hide();
$("#makeCode").hide();
$("#drink").hide();

$(document).ready(function () {

    $("#changeName").on("click", function () {
        getBorn();
        $(this).fadeOut();
    });
    elementary();
    $("#userName").html(newName);
    //sleeping
    $("#sleep-btn").on("click", function () {
        sleep();
    });

    //hobby buttons
    $("#makeCode").on("click", function () {
        makeCode();
    });
    $("#drink").on("click", function () {
        drink();
    });

    //making money buttons
    $("#work").on("click", function () {
        work();
    });

    //learning buttons
    $("#lookAbout").on("click", function () {
        study(0, 1, 1, "explore the world");
    });
    $("#play").on("click", function () {
        study(0, 5, 3, "play");
        $("#makeFriends").slideDown();
    });
    $("#study").on("click", function () {
        study(0, 10, 5, "study");
    });

    //intelligence upgrades
    $("#sitUp").on("click", function () {
        intelUp(49, 1.1, "sit up on you own");
        if (intelligence > 49) {
            $(this).slideUp();
            sit = true;
        }
    });
    $("#crawl").on("click", function () {
        intelUp(99, 1.5, "crawl");
        if (intelligence > 99) {
            $(this).slideUp();
            $("#play").slideDown();
        }
    });
    $("#learnWalk").on("click", function () {
        intelUp(149, 1.5, "walk on your own");
        if (intelligence > 149) {
            $(this).slideUp();
            walk = true;
        }
    });
    $("#learnTalk").on("click", function () {
        intelUp(299, 2, "to talk! Now, to learn how to stop");
        if (intelligence > 299) {
            $(this).slideUp();
            $("#eat").slideDown();
            talk = true;
            hunger();
        }
    });
    $("#eat").on("click", function () {
        eat();
    });
    $("#makeFriends").on("click", function () {
        makeFriends();
    });
});