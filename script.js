var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 500;
var W = canvas.width;
var H = canvas.height;
var maxAsteroids = 25; //max asteroids
var asteroids = [];
var asteroidsDodged = 0;
var alive = true;
var easyLevel;
var mediumLevel;
var hardLevel;



function initialise(){
	fillAsteroidArray(asteroids, maxAsteroids);
	drawAsteroid();
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
		ctx.beginPath();
		ctx.fillStyle = "greenyellow";
		ctx.shadowColor = null;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillRect(this.x + 15, this.y, this.width - 30, this.height / 2 - 12);
		ctx.fillRect(this.x + 22.5, this.y, this.width - 45, this.height / 2 - 15);

	}// End drawShip function 
}; // End spaceShip Object



function fillAsteroidArray(asteroids, maxAsteroids){
	for(var i = 0; i < maxAsteroids; i++){
		asteroids.push({
			x: Math.floor(Math.random()*W), //x-coordinate
			y: Math.floor(Math.random()*H), //y-coordinate
			r: Math.random()*25 + 4, //radius
			d: Math.random() * maxAsteroids //density
		});
	}
}



function drawAsteroid()
{
	ctx.clearRect(0, 0, W, H);

	ctx.fillStyle = "ghostwhite";
	/*ctx.shadowBlur = 50;
	ctx.shadowColor = "red";*/
	ctx.beginPath();
	for(var i = 0; i < maxAsteroids; i++)
	{
		var ast = asteroids[i];
		ctx.moveTo(ast.x, ast.y);
		ctx.arc(ast.x, ast.y, ast.r, 0, Math.PI*2, true);
	}
	ctx.fill();
	update();
	
	
	if(alive == true)
	{
		for(var i = 0; i < maxAsteroids; i++)
		{
			if(collisions(asteroids, maxAsteroids)) 
			{	
				alive = false;
			}
		}
	    window.requestAnimationFrame(drawAsteroid);
	}
	else
	{
		window.cancelAnimationFrame(drawAsteroid);
		gameOverFunction();
	}
}



function randColour(){
	var c = Math.round(0xffffff * Math.random());	
	return ('#0' + c.toString(16)).replace(/^#0([0-9a-f]{6})$/i, '#$1');
}



function gameOverFunction(){
	alert("GAME OVER, Your Ship Crashed!\n\nYou dodged " + asteroidsDodged + " Asteroids\n\nReturning to Menu");
	window.location.href = "index.html";
}


function asteroidDodgeHTMLcount(asteroidsDodged){
	document.getElementById("asteroidsDodged").innerHTML = asteroidsDodged;
}


function update()
{
	for(var i = 0; i < maxAsteroids; i++)
	{
		var ast = asteroids[i];		
		
		
		ast.y += Math.floor((Math.random() * 1) + 0.5);
		
		if(asteroidsDodged > 20)
			ast.y += Math.floor((Math.random() * 1.1) + 1);
		if(asteroidsDodged > 100)
			ast.y += Math.floor((Math.random() * 1.1) + 1);
		if(asteroidsDodged > 200)
			ast.y += Math.floor((Math.random() * 1.1) + 1);
		if(asteroidsDodged > 300)
			ast.y += Math.floor((Math.random() * 1.1) + 1);
		if(asteroidsDodged > 400)
			ast.y += Math.floor((Math.random() * 1.1) + 1);
		
		
			
		if(ast.y > H)
		{
			asteroidDodgeHTMLcount(asteroidsDodged += 1);
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




function collisions(asteroids, maxAsteroids)
{
	for(var i = 0; i < maxAsteroids; i++)
	{
		var distX = Math.abs(asteroids[i].x - spaceShip.x - spaceShip.width / 2);
		var distY = Math.abs(asteroids[i].y - spaceShip.y - spaceShip.height / 2);

		if (distX > (spaceShip.width / 2 + asteroids[i].r)) {
			continue;
		}
		if (distY > (spaceShip.height / 2 + asteroids[i].r)) {
			continue;
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
}



initialise(); // Start Everything 

// End of JavaScript file