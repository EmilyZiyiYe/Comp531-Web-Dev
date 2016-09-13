window.onload = function() {
    var logoutBtn = document.getElementById("logoutBtn")
    logoutBtn.onclick = function() {
        window.location = "index.html"
    }
    
    var profileBtn = document.getElementById("profileBtn")
    profileBtn.onclick = function() {
        window.location = "profile.html"
    }
}