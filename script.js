var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;
var W = canvas.width;
var H = canvas.height;
var maxAsteroids = 50; //max asteroids
var asteroids = [];


function initialise(){
	fillAsteroidArray(asteroids, maxAsteroids);
	drawAsteroid();
	collisionDetection();
}


// Create Spaceship Object
var spaceShip = {
	position: {
		x: canvas.width / 2, 
		y: canvas.height - 20
	}, 
	size: {
		width: 50, 
		height: 12
	},  
	Velocity: {
		x: 20
	}, 
	drawSpaceShip: function(){ // Draw Spaceship Object
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.fillStyle = "lightblue";
		ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
		ctx.fillRect(this.position.x + 15, this.position.y, this.size.width - 30, this.size.height / 2 - 12);
		ctx.fillRect(this.position.x + 22.5, this.position.y, this.size.width - 45, this.size.height / 2 - 15);

	}// End drawShip function 
}; // End spaceShip Object




function fillAsteroidArray(asteroids, maxAsteroids){
	for(var i = 0; i < maxAsteroids; i++){
		asteroids.push({
			x: Math.round(Math.random()*W), //x-coordinate
			y: Math.round(Math.random()*H), //y-coordinate
			r: Math.random()*25 + 2, //radius
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




var hitCount = 0;
var astCollisionCheck;

// Work in Progress....

function collisionDetection(){
	for(var i = 0; i < maxAsteroids; i++){
		// astCollisionCheck = asteroids[i];

		if(spaceShip.position.x < asteroids[i] || spaceShip.position.y < asteroids[i] ||
		   spaceShip.position.x > asteroids[i] || spaceShip.position.y > asteroids[i]){
			hitCount += 1;
			console.log(hitCount);
		}
		else
			console.log("No Collision Detection");
	}
}					 






function update()
{
	for(var i = 0; i < maxAsteroids; i++)
	{
		var ast = asteroids[i];
		ast.y += Math.floor((Math.random() * 2) + 1);

		if(ast.y > H)
		{
			{
				asteroids[i] = 
					{
					x: Math.random()*W, y: -10,
					r: ast.r, 
					d: ast.d
				};
			}
		}
	}
	spaceShip.drawSpaceShip();
}
// setInterval(draw, 10); //animation loop





// Add an event listener to the keypress event relating to moving the SpaceSHip left and right
window.addEventListener("keydown", function(event) { 
	// console.log(event.keyCode); // For Debug purposes: Used to log the key that was pressed
	if(event.keyCode == 39){
		spaceShip.position.x += spaceShip.Velocity.x;

		if(spaceShip.position.x >= canvas.width - spaceShip.size.width){
			spaceShip.position.x = canvas.width - spaceShip.size.width;
		}
		spaceShip.drawSpaceShip();
	}
	if(event.keyCode == 37){
		spaceShip.position.x -= spaceShip.Velocity.x;

		if(spaceShip.position.x <= spaceShip.size.width - spaceShip.size.width){
			spaceShip.position.x = spaceShip.size.width - spaceShip.size.width;
		}
		spaceShip.drawSpaceShip();
	}
}); // End window.addEventListener


initialise(); // Start Everything 
