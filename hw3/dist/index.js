window.onload = function() {
    var loginBtn = document.getElementById("loginBtn")
    loginBtn.onclick = function(){
        var userName = document.getElementById("username").value 
        var password = document.getElementById("password").value 
        
        if (userName.trim().length === 0){
            alert("User name can't be empty!")
            return false
        }
        
        if (password.trim().length === 0){
            alert("Password can't be empty!")
            return false
        }
        return true
    }
}