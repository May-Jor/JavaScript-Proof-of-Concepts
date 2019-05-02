//setting context from canvas
var canvas = document.getElementById("table_canvas");
var c = canvas.getContext("2d");
canvas.height = window.innerHeight - 100;
canvas.width = window.innerWidth - 20;
//circle amount control
//finds optimal amount of circles based on height and width of canvas
var colAmount = Math.floor(canvas.height / 100) - 1;
var rowAmount = Math.floor(canvas.width / 100) - 1;
//finally, create a speed constant so the animations don't get messed up due to framerate
const speedLimit = .1;
//decided to create object constructor for all circles used for x, and y input
var Circle = function(speed){
	this.speed = speed;
	this.angle = Math.PI/2;
	this.OriginX;
	this.OriginY;
	this.PointX;
	this.PointY;
	this.radius = 44;
	this.draw = function(){
		c.beginPath();
		c.arc(this.OriginX,this.OriginY,this.radius,0,2*Math.PI);
		c.strokeStyle="Black";
		c.stroke();
	};
	this.drawPoint = function(){
		c.beginPath();
		c.arc(this.PointX,this.PointY,2,0,2*Math.PI);
		c.strokeStyle="Blue";
		c.stroke();
	}
}

//create edge circles
var circlesCol = [];
//column 1
for(var i = 1; i <= colAmount; i++){
	var circle = new Circle(i);
	circle.speed = speedLimit * i;
	circle.OriginX = 50;
	circle.OriginY = 50 + (i * 100);
	circlesCol.push(circle);
}
var circlesRow = [];
//row 1
for(var i = 1; i <= rowAmount; i++){
	var circle = new Circle(i);
	circle.speed = speedLimit * i;
	circle.OriginX = 50 + (i * 100);
	circle.OriginY = 50;
	circlesRow.push(circle);
}
//circle handle function
function circleStuff(circle){
	//clear cricle grids
		c.clearRect(circle.OriginX - 50,circle.OriginY - 50,100,100);
		circle.draw();
		//calc pos of point on circle
		circle.PointX = Math.cos((circle.angle * Math.PI) / 180) * circle.radius + circle.OriginX;
		circle.PointY = Math.sin((circle.angle * Math.PI) / 180) * circle.radius + circle.OriginY;
		circle.angle += circle.speed;
		circle.drawPoint();
}

//animation function
function animate(){
	//draw circles
	circlesCol.forEach(function(circle){
		circleStuff(circle);
	});
	circlesRow.forEach(function(circle){
		circleStuff(circle);
	});

	//now loop through all circle pos combos, then draw point
	for(var i = 0; i < circlesCol.length; i++){
		for(var j = 0; j < circlesRow.length; j++){
			c.beginPath();
			//user Column circles for Y-value, and Row circles for X-value
			c.arc(circlesRow[j].PointX,circlesCol[i].PointY,1,0,2*Math.PI);
			c.fillStyle="red";
			c.fill();
		}
	}
	//callback
	window.requestAnimationFrame(animate);
}

animate();