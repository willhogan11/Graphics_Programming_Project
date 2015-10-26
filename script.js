var canvas = document.getElementById("gameCanvas"); // Gets a handle to the element with id canvasOne.
var ctx = canvas.getContext("2d"); // Get a 2D context for the canvas.


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
    colour: "blue", 
    drawSpaceShip: function(){ // Draw Spaceship Object
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.fillRect(this.position.x + 15, this.position.y, this.size.width - 30, this.size.height / 2 - 12);
        ctx.fillRect(this.position.x + 22.5, this.position.y, this.size.width - 45, this.size.height / 2 - 15);

    }// End drawShip function 
}; // End spaceShip Object


/*var rectangle = {
	position: {
		x: canvas.width / 2, 
		y: canvas.height / 2
	}, 
	size: {
		width: 50, 
		height: 20
	},  
	colour: "blue",       
	drawRectangle: function(){
		ctx.fillStyle = "blue";
		ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
	}
};*/



function Block(){
	this.position = {
		x: canvas.width / 2, 
		y: canvas.height / 2 
	};
	this.size = {
		width: 50, 
		height: 20
	};
	this.colour = "blue";
	this.isActive = true;
	this.drawRectangle = function(){
		if(this.isActive){	
			ctx.fillStyle = "blue";
			ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
		}
	};
}


function init(){
	spaceShip.drawSpaceShip(); // Draw the Actual Space Ship object
	// rectangle.drawRectangle(); 
	var block = new Block();
}


init(); // Calls the init function, that creates the SpaceShip and Rectangle



// Create Bullet Object
var bullet = {
    position:{
        x: spaceShip.size.width / 2,     
        y: canvas.height - 40 
    }, 
    size:{    
        width: 2, 
        height: 12
    }, 
	velocity: 5, 
    drawBullet: function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		spaceShip.drawSpaceShip();
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(spaceShip.position.x + 24, this.position.y, this.size.width, this.size.height);
		
    } // End drawBullet function
}; // end bullet object



// Add an event listener to the keypress event.
window.addEventListener("keydown", function(event) { 
    // console.log(event.keyCode); // Used to display the key that was pressed
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

    function repeatBullet(){
        if(event.keyCode == 70){
            bullet.drawBullet(); 
            bullet.position.y -= bullet.velocity;                 
            console.log("Bullet Firing...", bullet.position.y);
            window.requestAnimationFrame(repeatBullet);

            if(bullet.position.y < 1){
                // console.log("Ceiling Reached, stop bullet");
                window.cancelAnimationFrame(repeatBullet);
                // console.log("Frame should be successfully cancelled and this should print once");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
				spaceShip.drawSpaceShip();
            }
        } 
    }
    window.requestAnimationFrame(repeatBullet);
}); // End window.addEventListener