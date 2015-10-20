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
        /*   ctx.strokeStyle = "black";
                    ctx.lineWidth = 1;
                    ctx.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
                    ctx.strokeRect(this.position.x + 15, this.position.y, this.size.width - 30, this.size.height / 2 - 12);*/
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.fillRect(this.position.x + 15, this.position.y, this.size.width - 30, this.size.height / 2 - 12);
        ctx.fillRect(this.position.x + 22.5, this.position.y, this.size.width - 45, this.size.height / 2 - 15);

    }// End drawShip function 
}; // End spaceShip Object



spaceShip.drawSpaceShip(); // Draw the Actual Space Ship object


// Create Bullet Object
var bullet = {
    position:{
        x: spaceShip.size.width / 2,     
        y: canvas.height - 40 
    }, 
    size:{    
        width: 3, 
        height: 12
    }, 
    drawBullet: function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(spaceShip.position.x, this.position.y, this.size.width, this.size.height);

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
            bullet.position.y -= 1;                 
            // console.log("Bullet Firing...", bullet.position.y);
            window.requestAnimationFrame(repeatBullet);

            if(bullet.position.y < 1){
                console.log("Ceiling Reached, stop bullet");
                window.cancelAnimationFrame(repeatBullet);
                console.log("Frame should be successfully cancelled and this should print once");
                //ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        } 
    }
    window.requestAnimationFrame(repeatBullet);
}); // End window.addEventListener