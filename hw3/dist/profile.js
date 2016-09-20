window.onload = function() {
    var mainBtn = document.getElementById("mainPageBtn")
    mainBtn.onclick = function() {
        window.location = "main.html"
    }
    
    function testPattern(regex, string) {
        var re = new RegExp(regex)
        if (re.test(string)) {
            return true
        }
        else {
            return false
        }
    }
    
    var updateBtn = document.getElementById("updateBtn")
    var regForm = document.getElementById("regForm")
    regForm.onsubmit = function() {
        var inputs = document.getElementsByTagName("input")
        Array.from(inputs).forEach(function(input){
            var updatedValue = input.value
            if (testPattern(input.pattern, updatedValue)){
                var inputSpan = document.getElementById(input.id + "Value")
                if (inputSpan){
                    inputSpan.innerHTML = input.value
                }
            }
            input.value = ""
        })
        return false
    }
    
}