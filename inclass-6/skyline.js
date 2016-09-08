'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");
    var buildings = []
    var counter = 0
    var speed = 10
    var floor = canvas.height/2
    
	// Create the ground
    function drawGround(){
        var grad = c.createLinearGradient(0,floor,0,canvas.height)
        grad.addColorStop(0, "green")
        grad.addColorStop(1, "black")
        c.fillStyle=grad
        c.fillRect(0, floor, canvas.width, canvas.height)
    }
	
    
    // Create the sun
    function drawSun(x) {
        c.beginPath()
        c.arc(x, 100, 10, 0 ,2*Math.PI)
        c.stroke()
        c.fillStyle = "yellow"
        c.fill()
    }
    
    // Create the car
    function drawCar(x) {
        c.fillStyle = "black"
        c.fillRect(x, 380, 30, 20)
    }
    
	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3
    
    var increaseHeight = 5

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 
    
    function paintBuilding(building) {
        c.fillStyle= building.color
		c.fillRect(building.loc, floor - building.height, building.width, building.height)
        
        for (var y = floor - floorSpacing; y > floor - building.height; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < building.width - windowWidth; x += windowSpacing + windowWidth) {
                if (Math.random() > 0.5) {
                    c.fillStyle = "yellow"
                }
                else {
                    c.fillStyle = building.color
                }
				c.fillRect(building.loc + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
    }
    
     // draw all buildings
    function drawBuildings(){
        buildings.forEach(function(building){
            paintBuilding(building)
        })
    }
    
	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
        var blgColor = blgColors[ Math.floor(Math.random()*blgColors.length)]
        
        var building = new Object()
        building.loc = x0
        building.width = blgWidth
        building.height = blgHeight
        building.color = blgColor
        
		paintBuilding(building)
        buildings.push(building)
	}
    
    var growBuilding = function(event) {
        var x = event.clientX
        var y = event.offsetY
        
        buildings.forEach(function(building){
            var locX = building.loc
            var height = building.height
            var width = building.width
            var locY = floor - height
            
            if ((locX <= x) && (x <= locX+width)&& (locY <= y) && (y <= floor)){
                c.clearRect(locX, locY, width, height)
                building.height += increaseHeight
                paintBuilding(building)
            }
        })
        
    }
    
    canvas.addEventListener("click", growBuilding)
    
    // draw the whole thing
    function drawAll(){
        counter += 1
        var loc = (counter * speed) % canvas.width
        c.clearRect(0, 0, canvas.width, canvas.height)
        drawGround()
        drawSun(loc)
        drawBuildings()
        drawCar(loc)
    }
    
    setInterval(drawAll, 1000)
    
	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
}


