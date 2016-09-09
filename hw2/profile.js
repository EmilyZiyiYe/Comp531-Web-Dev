function testPattern(regex, string) {
    var re = new RegExp(regex)
    if (re.test(string)) {
        return true
    }
    else {
        return false
    }
}

function validateName(inputs, updatedFields){
    var nameInput = document.getElementById("dispName");
    inputs.push(nameInput)
    var name = nameInput.value
    if (!testPattern("[A-Za-z]+[A-Za-z0-9]*", name)) {
        alert("Account name can only be upper or lower case letters " + 
              "and numbers, but may not start with a number")
        return
    }
    var existedName = document.getElementById("dispNameValue")
    if (name.trim() && name !== existedName.innerHTML){
        updatedFields.push(["display name", name])
    }
}

function validateEmail(inputs, updatedFields){
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
}

function validatePhone(inputs, updatedFields){
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
}

function validateZipcode(inputs, updatedFields){
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
}


function validatePassword(inputs){
    var pwdInput = document.getElementById("pwd")
    var pwdCfmInput = document.getElementById("pwdCfm")
    inputs.push(pwdInput)
    inputs.push(pwdCfmInput)
    var pwd = pwdInput.value
    var pwdCfm = pwdCfmInput.value
    var pwdUpdatedText = document.getElementById("pwdUpdateTxt")
    if (pwd !== pwdCfm) {
        alert("Password and confirmation password don't match.")
        pwdUpdatedText.style.display = "none"
        return
    }
    else {
        var pwdValueInput = document.getElementById("pwdValue")
        if (pwd !== pwdValueInput.innerHTML) {
            pwdUpdatedText.style.display = "inline"
            pwdValueInput.innerHTML = pwd
        }
        else {
            pwdUpdatedText.style.display = "none"
        }
    }
}

var submitBtn = document.getElementById("submit")
submitBtn.onclick = function() {
    // array that stores the input fields which have been updated
    var updatedFields = []
    // cached input DOM elements
    var inputs = []
    
    // validate each input field
    validateName(inputs, updatedFields)
    validateEmail(inputs, updatedFields)
    validatePhone(inputs, updatedFields)
    validateZipcode(inputs, updatedFields)
    validatePassword(inputs)
    
    // inform users what fields have been updated
    if (updatedFields.length > 0) {
        var updateMessage = ""
        updatedFields.forEach(function(item, index){
            var fieldId = item[0]
            updateMessage += fieldId
            updateMessage += " have been updated from "
            if (fieldId === "display name") {
                fieldId = "dispName"
            }
            fieldId = fieldId + "Value"
            var updatedInput = document.getElementById(fieldId)
            updateMessage += (updatedInput.innerHTML + " to " + item[1] + "\n")
            updatedInput.innerHTML = item[1]
        }) 
        
        alert(updateMessage)
    }
    
    // clear all the input fields
    inputs.forEach(function(item){
            item.value = ""
    })
    
}