var createApp = function(canvas) { 
    canvas.setAttribute("width", 1200)
    canvas.setAttribute("height", 500)
    
	var context = canvas.getContext("2d");
    var floor = (canvas.height * 9) / 10
    var canvasWidth = canvas.width
    var cannonAngle = Math.atan2(10, 0)
    var cannonBalls = []
    var planes = []
    const RADIUS = 5
    const PLANEDIMENSION = 60
    const CANNONDIMENSION = 50
    const PLANEVELOCITY = 30
    const POINTRATIO = 10
    const VELOCITYRATIO = 10
    var totalPts = 0
    var attempts = 0
    var planesHit = 0
    var diffucultyLevel = 1
    var drawAllInterval, createPlaneInterval
    
     
    
    const PLANEIMAGES = {
        RED: "redplane",
        BLUE: "blueplane",
        YELLOW: "yellowplane"
    }
    
    function randomNumber(x) {
        // generate random integer number from 1 to x inclusive
        return Math.floor((Math.random() * x) + 1)
    }
    
    function roundNum(x) {
        // round the number in two decimal place for hit rate
        return Math.round(x * 10000)/100
    }
    
    
    function drawRotated(image, degrees){
        context.clearRect(0,0,canvas.width,canvas.height);
        // save the unrotated context of the canvas so we can restore it later
        context.save();
        // move to the point of where the cannon is located
        context.translate(canvasWidth / 2,floor - CANNONDIMENSION);
        context.translate(CANNONDIMENSION / 2, CANNONDIMENSION / 2)

        // rotate the canvas to the specified degrees in [-90, 90] range
        var ang = 90 - degrees/Math.PI*180
        if (ang > 90){
            ang = 90
        }
        if (ang < -90) {
            ang = -90
        }
        context.rotate(ang*Math.PI/180);
        context.drawImage(image,-CANNONDIMENSION/2,-CANNONDIMENSION/2,
                          CANNONDIMENSION,CANNONDIMENSION)

        // we’re done with the rotating so restore the unrotated context
        context.restore();
    }
    
	// Create the ground
    function drawGround(){
        context.fillStyle="green"
        context.fillRect(0, floor, canvas.width, canvas.height)
    }
    
    function drawCannon(){
        var img = document.getElementById("cannon")
        drawRotated(img, cannonAngle)
    }
    
    function drawBall(x, y, radius) {
        context.beginPath()
        context.arc(x, y, RADIUS, 0 ,2*Math.PI)
        context.stroke()
        context.fillStyle = "black"
        context.fill()
    }
    
    function updatePts(point) {
        totalPts += point
        planesHit += 1
        document.getElementById("totalPts").innerHTML = totalPts
        updateHitRate()
        
        if (totalPts >= diffucultyLevel * 100){
            diffucultyLevel += 1
            document.getElementById("level").innerHTML = diffucultyLevel
        }
    }
    
    function updateHitRate(){
        var hitRate = roundNum(planesHit / attempts)
        document.getElementById("hitRate").innerHTML = String(hitRate) + "%"
    }
    
    function checkCollide(x, y){
        var pIdx = -1
        planes.forEach(function(plane, index){
            if ((x - RADIUS >= plane.locX) && (x + RADIUS <= plane.locX + PLANEDIMENSION)
                && (y - RADIUS <= (CANNONDIMENSION + PLANEDIMENSION)) 
                && (y >= CANNONDIMENSION)) {
                pIdx = index
                updatePts(plane.point)
            }
        })
        
        if (pIdx !== -1) {
            planes.splice(pIdx, 1)
            return true
        }
        else {
            return false
        }
    }
    
    function drawBalls() {
        var ballIdx = []
        cannonBalls.forEach(function(ball, index){
            if (checkCollide(ball.locX, ball.locY)){
                ballIdx.push(index)
            }
        })
        
        if (ballIdx.length > 0) {
            ballIdx.forEach(function(idx){
                cannonBalls.splice(idx, 1)
            })
        }
        
        cannonBalls.forEach(function(ball, index){
            ball.locX += ball.velocityX
            ball.locY -= ball.velocityY
            drawBall(ball.locX, ball.locY)
        })
    }
    
    function createPlane() {
        var random = randomNumber(3)
        var plane = {
            locX: 0,
            locY: CANNONDIMENSION,
            velocityX: PLANEVELOCITY * diffucultyLevel,
            color: random,
            point: random * POINTRATIO
        }
        planes.push(plane)
    }
    
    function drawPlane(x, y, color) {
        switch (color){
            case 1:
                planeID = PLANEIMAGES.RED
                break
            case 2:
                planeID = PLANEIMAGES.YELLOW
                break
            case 3:
                planeID = PLANEIMAGES.BLUE   
                break
        }
        
        var planeImg = document.getElementById(planeID)
        context.drawImage(planeImg, x, y)
    }
    
    function drawPlanes() {
        planes.forEach(function(plane){
            plane.locX += plane.velocityX
            drawPlane(plane.locX, plane.locY, plane.color)
        })
    }
    
    // draw the whole thing
    function drawAll(){
        drawCannon()
        drawGround()
        drawBalls()
        drawPlanes()
    }
    
    function startGame() {
        document.getElementById("startBtn").disabled = true
        document.getElementById("endBtn").disabled = false
        document.getElementById("totalPts").innerHTML = "0"
        document.getElementById("attempts").innerHTML = 0
        document.getElementById("hitRate").innerHTML = "0%"
        document.getElementById("level").innerHTML = 1
        createPlane()
        drawAllInterval = setInterval(drawAll, 300)
        createPlaneInterval = setInterval(createPlane, 1500)
    }
    
    function endGame() {
        document.getElementById("startBtn").disabled = false
        document.getElementById("endBtn").disabled = true
        context.clearRect(0,0,canvas.width, canvas.height)
        clearInterval(drawAllInterval)
        clearInterval(createPlaneInterval)
        cannonBalls = []
        planes = []
        totalPts = 0
        planesHit = 0
        attempts = 0
    }
    
    
    function addAttempt() {
        attempts += 1
        document.getElementById("attempts").innerHTML = attempts
        updateHitRate()
    }
    
    canvas.addEventListener('mousemove', function(evt) {
        var dx = evt.clientX - canvasWidth / 2
        var dy = floor - evt.clientY
        cannonAngle = Math.atan2(dy, dx)
    }, false);
    
    canvas.addEventListener('mousedown', function(evt){
        var vX = Math.abs(evt.clientX - canvasWidth / 2) / VELOCITYRATIO
        var vY = (floor - evt.clientY) / VELOCITYRATIO
        var sign = (evt.clientX > canvasWidth / 2) ? 1 : -1
        var cannonBall = {
            locX: canvasWidth / 2 + CANNONDIMENSION / 2,
            locY: floor - CANNONDIMENSION / 2,
            velocityX: sign * vX,
            velocityY: vY
        }
        cannonBalls.push(cannonBall)
        addAttempt()
    }, false)
    
	return {
        startGame: startGame,
        endGame: endGame
    }
}



window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
    document.getElementById("startBtn").onclick = app.startGame
    document.getElementById("endBtn").onclick = app.endGame
}