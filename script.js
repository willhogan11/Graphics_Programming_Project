// Global Variable Declaration
var canvas = document.getElementById("canvas"); // Binds the HTML canvas tag to the variable declared here
var ctx = canvas.getContext("2d"); // Prepares a 2d context, to draw objects, shapes etc. 
canvas.width = 1200; // Sets the canvas width
canvas.height = 480; // Sets the canvas height
var W = canvas.width; // Shorten variable name
var H = canvas.height; // Shorten variable name
var maxAsteroids = 25; // Sets the Maximum amount of asteroids on the screen
var asteroids = []; // Delcares an empty asteroid array to store an array of asteroid objects
var asteroidsDodged = 0; // asteroidsDodged count (incremented in game)
var alive = true; // Life Status
var levelStatus = ["LEVEL 1", "LEVEL 2", "LEVEL 3", "LEVEL 4", "LEVEL 5", "LEVEL 6", 
				   "LEVEL 7", "LEVEL 8", "LEVEL 9", "LEVEL 10", "LEVEL 11", "LEVEL 12"]; // An array of messages to be displayed for the user as they progress through the game



// Function to initialise the game
function initialise()
{
	fillAsteroidArray(asteroids, maxAsteroids); // Fill the asteroidArray with objects
	drawMoveAsteroid(); // Draw the asteroid and use animation on the screen to move
}



// Create Spaceship Object to be used throughout the game
var spaceShip = {
	position: { // Position sub section with x and y coordinates
		x: W / 2, // Centers the x-coordinate of spaceShip to middle of screen
		y: H - 20 // Locates ship to the bottom of the screen
	}, 
	size: { // Size sub section that deals with the spaceShip height and width
		width: 50, // Width of spaceShip
		height: 12 // heightof the spaceShip
	}, 
	Velocity: { // The speed that th ship moves
		x: 20 // Value of speed for movement
	}, 
	drawSpaceShip: function()// Draw Spaceship Object
	{ 
		ctx.beginPath(); // Start the path for drawing the spaceShip
		ctx.fillStyle = "greenyellow"; // Colour of spaceShip

		// Bottom part of spaceShip: Fill the Rectangle with the values defined in this object
		ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height); 

		// Middle part of spaceShip:
		ctx.fillRect(this.position.x + 15, this.position.y, this.size.width - 30, this.size.height / 2 - 12); 

		// spaceShip turret:
		ctx.fillRect(this.position.x + 22.5, this.position.y, this.size.width - 45, this.size.height / 2 - 15); 

	}// End drawShip function 
}; // End spaceShip Object




/* Function to push all created objects into empty globally declared array, which takes two arguements:
		- asteroids: The now (after initialised) populated array itself that holds the asteroid objects
		- maxAsteroids: The size of the maxAsteroids to be passed as parameter*/
function fillAsteroidArray(asteroids, maxAsteroids)
{
	for(var i = 0; i < maxAsteroids; i++)
	{
		asteroids.push({
			x: Math.floor(Math.random()*W), //x-coordinate
			y: Math.floor(Math.random()*H), //y-coordinate
			r: Math.random()*25 + 4, // radius
			d: Math.random() * maxAsteroids // density
		});
	}
} // End function fillAsteroidArray




/*Function to draw the asteroids by filling the circles and using the animation 
	  to move the asteroid objects down through the screen. */
function drawMoveAsteroid()
{
	ctx.clearRect(0, 0, W, H); // Clear the context
	ctx.fillStyle = "ghostwhite"; // Colour
	ctx.beginPath(); // Start the circle path
	for(var i = 0; i < maxAsteroids; i++)
	{
		var ast = asteroids[i]; // Store the asteroid objects in a variable 
		ctx.moveTo(ast.x, ast.y); // Move to each location of x / y coordinates
		ctx.arc(ast.x, ast.y, ast.r, 0, Math.PI*2, true); // Draw the actual asteroids
	}
	ctx.fill(); // Fill them
	update(); // See below, this triggers the Animation part of the project

	// This section checks to see if the spaceShip has been hit
	if(alive == true) // If still alive...
	{
		// If there are collisions between ANY of the asteroids and spaceShip..
		for(var i = 0; i < maxAsteroids; i++)
		{
			// Basically game over, as you were hit
			if(collisions(asteroids, maxAsteroids)) 
			{	
				alive = false; // Dead
			}
		}
		window.requestAnimationFrame(drawMoveAsteroid); // Continues with the animation as still alive
	}
	else
	{
		window.cancelAnimationFrame(drawMoveAsteroid); // Cancel the animation
		gameOverFunction(); // Call the gameover function with score review etc
	}
} // End function drawMoveAsteroid



// Not implemented, but essentially the idea was to have each asteroid a different colour, 
// however i opted out, deciding on the more reaslistic aesthetics of an asteroid
function randColour()
{
	var c = Math.round(0xffffff * Math.random());	
	return ('#0' + c.toString(16)).replace(/^#0([0-9a-f]{6})$/i, '#$1');
}




// Game over function that when hit, displays score and game oger and returns the user to the main menu
function gameOverFunction()
{
	alert("GAME OVER, Your Ship Crashed!\n\n" + 
		  "You dodged " + asteroidsDodged + " Asteroids\n\nReturning to Menu");
	window.location.href = "index.html"; // Back to menu
} // End function gameOverFunction




// Function to bind the asteroids dodged count dynamically to the relevant html tag
function asteroidDodgeHTMLcount(asteroidsDodged)
{
	document.getElementById("asteroidsDodged").innerHTML = asteroidsDodged; // As stated
} // End




/* Function to add difficulty to the users game experience, as the asteroids are dodged, the speed at which
	   they drop increases and the Level is dynamically changed on the fly in the HTML page, with the use of document.getElement
	   The colour of the Level text also changes depending on the level reached */
function gameLevelIncrease(asteroidsDodged, asteroids, ast, levelStatus)
{
	document.getElementById("levelStatus").style.color = "red"; // Color changed as per level text
	document.getElementById("levelStatus").innerHTML = levelStatus[0]; // Binds the array levelStatus index text to HTML page
	ast.y += Math.floor((Math.random() * 1.5) + 1); // Sets the speed

	// The same is repeated all the way down. Speed increases as added to start speed
	if(asteroidsDodged > 20){	
		document.getElementById("levelStatus").style.color = "orange";
		document.getElementById("levelStatus").innerHTML = levelStatus[1];
		ast.y += Math.floor((Math.random() * 1.5) + 0.5);	
	}
	if(asteroidsDodged > 100){
		document.getElementById("levelStatus").style.color = "yellow";
		document.getElementById("levelStatus").innerHTML = levelStatus[2];
		ast.y += Math.floor((Math.random() * 1.5) + 0.5);
	}
	if(asteroidsDodged > 200){
		document.getElementById("levelStatus").style.color = "green";
		document.getElementById("levelStatus").innerHTML = levelStatus[3];
		ast.y += Math.floor((Math.random() * 1.5) + 0.5);
	}
	if(asteroidsDodged > 300){
		document.getElementById("levelStatus").style.color = "blue";
		document.getElementById("levelStatus").innerHTML = levelStatus[4];
		ast.y += Math.floor((Math.random() * 1.5) + 0.5);
	}
	if(asteroidsDodged > 400){
		document.getElementById("levelStatus").style.color = "indigo";
		document.getElementById("levelStatus").innerHTML = levelStatus[5];
		ast.y += Math.floor((Math.random() * 1.5) + 0.5);
	}
	if(asteroidsDodged > 500){
		document.getElementById("levelStatus").style.color = "violet";
		document.getElementById("levelStatus").innerHTML = levelStatus[6];
		ast.y += Math.floor((Math.random() * 1.5) + 0.5);
	}
	if(asteroidsDodged > 600){
		document.getElementById("levelStatus").style.color = "grey";
		document.getElementById("levelStatus").innerHTML = levelStatus[7];
		ast.y += Math.floor((Math.random() * 1.5) + 0.5);
	}
	if(asteroidsDodged > 700){
		document.getElementById("levelStatus").style.color = "black";
		document.getElementById("levelStatus").innerHTML = levelStatus[8];
		ast.y += Math.floor((Math.random() * 1.5) + 0.5);
	}
	if(asteroidsDodged > 800){
		document.getElementById("levelStatus").style.color = "black";
		document.getElementById("levelStatus").innerHTML = levelStatus[9];
		ast.y += Math.floor((Math.random() * 1.5) + 0.5);
	}
	if(asteroidsDodged > 900){
		document.getElementById("levelStatus").style.color = "black";
		document.getElementById("levelStatus").innerHTML = levelStatus[10];
		ast.y += Math.floor((Math.random() * 1.5) + 0.5);
	}
	if(asteroidsDodged > 1000){
		document.getElementById("levelStatus").style.color = "black";
		document.getElementById("levelStatus").innerHTML = levelStatus[11];
		ast.y += Math.floor((Math.random() * 1.5) + 0.5);
	}
	if(asteroidsDodged > 1100){
		document.getElementById("levelStatus").style.color = "black";
		document.getElementById("levelStatus").innerHTML = levelStatus[12];
		ast.y += Math.floor((Math.random() * 1.5) + 0.5);
	}
} // End function gameLevelIncrease





/*This function controls what happens when the each asteroid reaches the bottom of the canvas. 
	  As each asteroid dissapears at the bottom, it reappears at a random location, immerging from the top. 
	  This way the array 'asteroids' is only ever filled once at the start of the game*/
function update()
{
	for(var i = 0; i < maxAsteroids; i++)
	{
		var ast = asteroids[i]; // Stores all asteroid objects in a variable
		gameLevelIncrease(asteroidsDodged, asteroids, ast, levelStatus); // Launches above function

		if(ast.y > H) // If at bottom...
		{
			asteroidDodgeHTMLcount(asteroidsDodged += 1); // Increment the count of each asteroid that reaches the bottom

			// ... and redraw each of the asteroids with their new coordinates
			asteroids[i] = {
				x: Math.random() * W, 
				y: -10,
				r: ast.r, 
				d: ast.d
			};
		}
	}
	spaceShip.drawSpaceShip(); // Finally redrawSpaceship

} // End update function





/*This function controls the movement of the spaceship from left to right
	  I have added an event listener to the keypress event relating to moving the SpaceShip in the directions, stated below
	  Also collision detection is present as to avoid spaceShip going past left / right bounderies*/
window.addEventListener("keydown", function(event) 
{ 
	// console.log(event.keyCode); // For Debug purposes: Used to log the key that was pressed
	if(event.keyCode == 39)
	{
		spaceShip.position.x += spaceShip.Velocity.x; // Go right

		if(spaceShip.position.x >= W - spaceShip.size.width) 
		{ 
			spaceShip.position.x = W - spaceShip.size.width; // Collision detection
		}
		spaceShip.drawSpaceShip(); // Redraw the spaceship at boundary
	}
	if(event.keyCode == 37)
	{
		spaceShip.position.x -= spaceShip.Velocity.x; // Go left

		if(spaceShip.position.x <= spaceShip.size.width - spaceShip.size.width)
		{ 
			spaceShip.position.x = spaceShip.size.width - spaceShip.size.width; // Collision detection
		}
		spaceShip.drawSpaceShip(); // Redraw the spaceship at boundary
	}
}); // End window.addEventListener





/*This function in summary deals with the asteroid collision detection with the spaceShip and passes two arguements
	  asteroids - The array that stores each asteroid object
	  maxAsteroids - The max amount of asteroids delcared in the game
	  If any asteroid collides with the spaceShip the game is over, ensuring 100% Collision control*/
function collisions(asteroids, maxAsteroids)
{
	for(var i = 0; i < maxAsteroids; i++)
	{
		var distX = Math.abs(asteroids[i].x - spaceShip.position.x - spaceShip.size.width / 2); 
		var distY = Math.abs(asteroids[i].y - spaceShip.position.y - spaceShip.size.height / 2);

		if (distX > (spaceShip.size.width / 2 + asteroids[i].r)) {
			continue; // If no collision on width, keep going
		}
		if (distY > (spaceShip.size.height / 2 + asteroids[i].r)) {
			continue; // If no collision on height, keep going
		}
		if (distX <= (spaceShip.size.width / 2)) {
			return true; // collision of width, collision detected
		}
		if (distY <= (spaceShip.size.height / 2)) {
			return true; // collision of height, collision detected
		}
		var dx = distX -  spaceShip.size.width / 2;
		var dy = distY - spaceShip.size.height / 2;
	}
} // End collisions function


initialise(); // Launch the game


// End of JavaScript file
