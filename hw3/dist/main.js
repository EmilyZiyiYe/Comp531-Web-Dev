window.onload = function() {
    var logoutBtn = document.getElementById("logoutBtn")
    logoutBtn.onclick = function() {
        window.location = "index.html"
    }
    
    var profileBtn = document.getElementById("profileBtn")
    profileBtn.onclick = function() {
        window.location = "profile.html"
    }
    
    var updateStatusBtn = document.getElementById("updateStatusBtn")
    var statusInput = document.getElementById("statusInput")
    updateStatusBtn.onclick = function() {
        document.getElementById("status").innerHTML = statusInput.value 
        statusInput.value = ""
    }
    
    var cancelBtn = document.getElementById("cancelBtn")
    cancelBtn.onclick = function() {
        document.getElementById("userPost").value = ""
    }
}