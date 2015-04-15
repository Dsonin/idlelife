
	function stat(name,startVal,value){
		this.name = name;
		this.start = startVal;
		this.value = value;
		this.rate = function(number){
			this.value = this.value + number;

		};
		this.update = function (){
		    document.getElementById(this).innerHTML=this.value.toString();
		};
	};

var money = new stat(money,0,0);

function work(number){
	money.rate(15);
	document.getElementById("money").innerHTML=money;
};


var floodfill = function(w,h){
	for (var i = 0; i < w; i++){
		i.replace(i,"@");
	};
}

floodfill(5,5);