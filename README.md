# Graphics_Programming_Project

- **Project Heading:** Software Development Project for 3rd year subject graphics programming
- **Title:** Asteroid Dodge
- **Created:** By Will Hogan
- **Submission Date:** 06th November 2015, 5pm
- **Third Level Establishment:** GMIT, Galway, Ireland

##Introduction  
As per module project specifications, i have created a 2D Game using HTML5, JavaScript & CSS which i've implemented using 
the HTML5 canvas.

##Instructions for use
Download zip and launch the ```index.html``` file within the project and launch using your preferred text editor. 

##Gameplay
Upon launching the game as instructed above, the user is brought to the main Screen. Click the Play button to start. 
The object of the game is to dodge asteroids as they hurtle towards the user controlled spaceship. The asteroids appear in random order so no path can be predetermined by the user, which adds to the game experience. On screen the user is informed as to the amount of Asteroids that they have dodged, plus the current difficulty level of their particular game. As the game progresses and the asteroids are dodged, the level increases and the asteroids get faster. If the user makes contact with any asteroid, the game is over and a display informs the user of how they did and returns them to the Main Screen. 
Please find attached screenshots for visual representation of my game. 

##Controls
The user is allowed to move left and right using the left and right arrow keys on the keyboard. Each press of any of those keys will move the user slightly in that direction, if the user requires to move faster, they must press and hold the left/right keys, which will almost instantly move rapidly in that direction. 

NOTE: Any specific keyboard settings that the user has setup on their computer will need to be re adjusted as speeds of key pressed down may vary. 

##Design
To being with i used a combination of Brackets and notepad++ for my development environment with google chrome and Firefox
as chosen testing web browsers. I have also opted for a logical file split to adhere to the Model View Controller design pattern

The game uses ```window.requestAnimationFrame``` to control the animation flow, this works smoothly and compliments 
the 'left' / 'right' event handlers allowing the user to move in said directions. Collisions have been dealt with 
using an algorithm which disables the user from moving past the frame border on either side and also ensures that any asteroid that makes contact with the users spaceship, results in the game ending. 

##Code Structure
Where possible i opted for neat functions that allows for resuse upon possible future game expansion requirements. 

Here is some sample code which shows how i created my SpaceShip object:
```javascript
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
```
