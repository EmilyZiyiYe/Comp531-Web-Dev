var bulbImg = ["001", "002", "003"]
var charImg = ["004", "005", "006"]
var squImg = ["007", "008", "009"]
var arbaImg = ["063", "064", "065"]
var eveImg = ["133", "134", "135", "136"]
var allImgIndex = [bulbImg, charImg, squImg, arbaImg, eveImg]

var timers = []
var counters = [0, 0, 0, 0, 0]

var START = "Start"
var STOP = "Stop"

var allImgs = document.getElementsByTagName("img")
var allButtons = document.getElementsByTagName("input")

function getImgSrc(imgIdx) {
    return "http://assets.pokemon.com/assets/cms2/img/pokedex/full/" 
        + imgIdx + ".png"
}

function randomInterval() {
    return (Math.floor(Math.random() * 5) + 1) * 1000
}

var rotateImage = function(img, index) {
    var imgCount = counters[index]
    imgCount += 1
    var numOfImgs = allImgIndex[index].length
    img.src = getImgSrc(allImgIndex[index][imgCount % numOfImgs])
    counters[index] = imgCount
}

Array.from(allImgs).forEach(function(item, index){
    var imgTimer = setInterval(rotateImage, randomInterval(), item, index)
    timers.push(imgTimer)
})


function stopInterval(button, index) {
    clearInterval(timers[index])
    button.value = START
}

function startInterval(button, index) {
    var startTimer = setInterval(rotateImage, randomInterval(), allImgs[index], index)
    timers[index] = startTimer
    button.value = STOP
}

Array.from(allButtons).forEach(function(button, index){
    button.onclick = function() {
        if (button.value === START) {
            startInterval(button, index)
        }
        else {
            stopInterval(button, index)
        }
    }
})
                                   
                                   