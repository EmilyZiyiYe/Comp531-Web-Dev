window.onload = function(){
    var SHIFTKEY = 16
    var avoidBtn = document.getElementById("avoid")
    var buttonWidth = avoidBtn.offsetWidth
    var buttonHeight = avoidBtn.offsetHeight
    var browserWidth = document.documentElement.clientWidth
    var browserHeight =  document.documentElement.clientHeight
    
    var moveButton = function(){
        avoidBtn.style.left = Math.floor(Math.random()*(browserWidth-buttonWidth)) + "px"
        avoidBtn.style.top = Math.floor(Math.random()*(browserHeight-buttonHeight)) + "px"
    }
    avoidBtn.addEventListener("mouseover", moveButton, false)
    
    var stopAvoiding = function(e){
        if (e.keyCode === SHIFTKEY){
            avoidBtn.removeEventListener("mouseover", moveButton, false)
        }
    }
    window.onkeydown = stopAvoiding
    
    var btnClickReplay = function() {
        avoidBtn.innerHTML = "Click Me!"
        document.getElementById("bannerDiv").style.display = "none"
        avoidBtn.removeEventListener("click", btnClickReplay)
        avoidBtn.addEventListener("click", btnClick)
        avoidBtn.addEventListener("mouseover", moveButton, false)
    }
    
    var btnClick = function() { document.getElementById("bannerDiv").style.display = "block"
        avoidBtn.innerHTML = "Play Again"
        avoidBtn.addEventListener("click", btnClickReplay)
    }
    
    avoidBtn.addEventListener("click", btnClick)
}


