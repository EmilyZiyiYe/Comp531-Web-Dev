function testPattern(regex, string) {
    var re = new RegExp(regex)
    if (re.test(string)) {
        return true
    }
    else {
        return false
    }
}

var submitBtn = document.getElementById("submit")
submitBtn.onclick = function() {
    var updatedFields = []
    var inputs = []
    
    var nameInput = document.getElementById("dispName");
    inputs.push(nameInput)
    var name = nameInput.value
    var existedName = document.getElementById("dispNameValue")
    if (name.trim() && name !== existedName.innerHTML){
        updatedFields.push(["display Name", name])
    }
    
    
    // validate email input
    var emailInput = document.getElementById("email")
    inputs.push(emailInput)
    var email = emailInput.value
    if (!testPattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email)) {
        alert("Email should contain @ and . for correct format.")
        return
    }
    var existedEmail = document.getElementById("emailValue")
    if (email !== existedEmail.innerHTML){
        updatedFields.push(["email", email])
    }
    
    // validate phone number input
    var phoneInput = document.getElementById("phone")
    inputs.push(phoneInput)
    var phone = phoneInput.value
    if (!testPattern("^\\d{3}-\\d{3}-\\d{4}$", phone)){
        alert("Phone number should be format of 123-123-1234")
        return
    }
    var existedPhone = document.getElementById("phoneValue")
    if (phone !== existedPhone.innerHTML){
        updatedFields.push(["phone", phone])
    }
    
    // validate zipcode
    var zipcodeInput = document.getElementById("zipcode")
    inputs.push(zipcodeInput)
    var zipcode = zipcodeInput.value
    if (!testPattern("^\\d{5}$", zipcode)) {
        alert("US zipcode should be exactly 5 digits.")
        return
    }
    var existedZipcode = document.getElementById("zipcodeValue")
    if (zipcode !== existedZipcode.innerHTML) {
        updatedFields.push(["zipcode", zipcode])
    }
    
    // inform users what field have been updated
    if (updatedFields.length > 0) {
        var updateMessage = ""
        updatedFields.forEach(function(item, index){
            updateMessage += item[0]
            if (index !== updatedFields.length - 1){
                updateMessage += ","
            }
        })
        
        updateMessage += " have been updated."
        alert(updateMessage)
        
        // update the values and clear the input
        updatedFields.forEach(function(item){
            var fieldId = item[0]
            if (fieldId === "display name") {
                fieldId = "dispName"
            }
            fieldId = fieldId + "Value"
            document.getElementById(fieldId).innerHTML = item[1]
        })
        
        inputs.forEach(function(item){
            item.value = ""
        })
    }
    
    
    
    
}