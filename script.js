var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;
var W = canvas.width;
var H = canvas.height;
var maxAsteroids = 20; //max asteroids
var asteroids = [];
var hitCount = 0;
var lives = 3;
var dead = false;
var gameOver = false;


function initialise(){
	fillAsteroidArray(asteroids, maxAsteroids);
	drawAsteroid();
	collisions(asteroids, spaceShip);
}



// Create Spaceship Object
var spaceShip = {
	x: canvas.width / 2, 
	y: canvas.height - 20, 
	width: 50, 
	height: 12, 
	Velocity: {
		x: 20
	}, 
	active: true,
	drawSpaceShip: function(){ // Draw Spaceship Object
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.fillStyle = "lightblue";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		// ctx.fillRect(this.position.x + 15, this.position.y, this.size.width - 30, this.size.height / 2 - 12);
		// ctx.fillRect(this.position.x + 22.5, this.position.y, this.size.width - 45, this.size.height / 2 - 15);

	}// End drawShip function 
}; // End spaceShip Object



function fillAsteroidArray(asteroids, maxAsteroids){
	for(var i = 0; i < maxAsteroids; i++){
		asteroids.push({
			x: Math.floor(Math.random()*W), //x-coordinate
			y: Math.floor(Math.random()*H), //y-coordinate
			r: 2, // Math.random()*25 + 2, //radius
			d: Math.random() * maxAsteroids //density
		});
	}
}



function drawAsteroid()
{
	ctx.clearRect(0, 0, W, H);

	ctx.fillStyle = "white";
	ctx.beginPath();
	for(var i = 0; i < maxAsteroids; i++)
	{
		var ast = asteroids[i];
		ctx.moveTo(ast.x, ast.y);
		ctx.arc(ast.x, ast.y, ast.r, 0, Math.PI*2, true);
	}
	ctx.fill();
	update();
	window.requestAnimationFrame(drawAsteroid);
}




function randColour(){
	var c = Math.round(0xffffff * Math.random());	
	return ('#0' + c.toString(16)).replace(/^#0([0-9a-f]{6})$/i, '#$1');
}

		 

function timeOutFunction() {
	dead = true;
	lives -= 1;
	ctx.fillStyle = "red";
	dead = false;
	console.log("Timeout Worked");
	spaceShip.active = true;
}


function gameOverFunction(){
	alert("GAME OVER!");
	initialise();
}



function update()
{
	if(collisions(asteroids, spaceShip) ) 
	{
/*		hitCount += 1;
		console.log(hitCount);*/
		spaceShip.active = false;
		while(spaceShip.active == false){	
			setTimeout(timeOutFunction(), 2000);
		}
		console.log("Lives : " + lives);

		if(lives == 0)
		{
			gameOver = true;
			gameOverFunction();
			window.cancelAnimationFrame(drawAsteroid);
		}
	}
	for(var i = 0; i < maxAsteroids; i++)
	{
		var ast = asteroids[i];
		ast.y += Math.floor((Math.random() * 6) + 1);

		if(ast.y > H)
		{
			asteroids[i] = 
			{
				x: Math.random()*W, y: -10,
				r: ast.r, 
				d: ast.d
			};
		}
	}
	spaceShip.drawSpaceShip();
}





// Add an event listener to the keypress event relating to moving the SpaceSHip left and right
window.addEventListener("keydown", function(event) { 
	
	
	// console.log(event.keyCode); // For Debug purposes: Used to log the key that was pressed
	if(event.keyCode == 39){
		spaceShip.x += spaceShip.Velocity.x;

		if(spaceShip.x >= canvas.width - spaceShip.width){
			spaceShip.x = canvas.width - spaceShip.width;
		}
		spaceShip.drawSpaceShip();
	}
	if(event.keyCode == 37){
		spaceShip.x -= spaceShip.Velocity.x;

		if(spaceShip.x <= spaceShip.width - spaceShip.width){
			spaceShip.x = spaceShip.width - spaceShip.width;
		}
		spaceShip.drawSpaceShip();
	}
}); // End window.addEventListener








function collisions(asteroids, spaceShip)
{
	for(var i = 0; i < maxAsteroids; i++)
	{
		var distX = Math.abs(asteroids[i].x - spaceShip.x - spaceShip.width / 2);
		var distY = Math.abs(asteroids[i].y - spaceShip.y - spaceShip.height / 2);

		if (distX > (spaceShip.width / 2 + asteroids[i].r)) {
			return false;
		}
		if (distY > (spaceShip.height / 2 + asteroids[i].r)) {
			return false;
		}
		if (distX <= (spaceShip.width / 2)) {
			return true;
		}
		if (distY <= (spaceShip.height / 2)) {
			return true;
		}
		var dx = distX -  spaceShip.width / 2;
		var dy = distY - spaceShip.height / 2;
	}
	return (dx * dx + dy * dy <= (asteroids[i].r * asteroids[i].r));
}



initialise(); // Start Everything 

