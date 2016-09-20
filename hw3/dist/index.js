window.onload = function() {
    var loginBtn = document.getElementById("loginBtn")
    loginBtn.onsubmit = function(){
        var userName = document.getElementById("username").value 
        var password = document.getElementById("password").value 
        
        if (userName.trim().length === 0){
            return false
        }
        
        if (password.trim().length === 0){
            return false
        }
        return true
    }
    
    var pwd = document.getElementById("pwd")
    var pwdCfm = document.getElementById("pwdCfm")
    
    function validatePassword(){
        var pass2=pwdCfm.value;
        var pass1=pwd.value;
        if(pass1!=pass2)
            pwdCfm.setCustomValidity("Passwords Don't Match");
        else
            pwdCfm.setCustomValidity('');	 
    }
    
    pwd.onchange = validatePassword
    pwdCfm.onchange = validatePassword
}