"use strict";

function submitForm() {
  
  // Set the status message.
  var statusMessage = "Please wait...";
  document.getElementById("statusMessage").value = statusMessage;
  document.getElementById("statusMessage").style.color = "white";
  
  // Get the form input.
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  
  // Create a new AJAX request.
  var xhr = new XMLHttpRequest();
  var url = "php/createAccount.php";
  var params = "username=" + username + "&password=" + password + "&email=" + email;
  xhr.open("POST", url, true);
  
  // Send the proper header information along with the request.
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  // Create a callback function.
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Transaction was successful.
      if (xhr.responseText == "0") {
        
        // Reset the form first.
        document.getElementById("accountForm").reset();
        
        // Update the status message.
        document.getElementById("statusMessage").value = "Account created successfully!";
        document.getElementById("statusMessage").style.color = "green";
      }
      
      else if (xhr.responseText == "1") {
        document.getElementById("statusMessage").value = "Email is invalid.";
        document.getElementById("statusMessage").style.color = "yellow";
      }
      
      else if (xhr.responseText == "2") {
        document.getElementById("statusMessage").value = "Account already exists.";
        document.getElementById("statusMessage").style.color = "red";
      }
      
      else if (xhr.responseText == "3") {
        document.getElementById("statusMessage").value = "Unknown error occurred.<br>Please try again.";
        document.getElementById("statusMessage").style.color = "red";
      }
      
      // DEBUG
      /*else
        document.write(xhr.responseText);*/
    }
  }
  
  // Send the AJAX request.
  xhr.send(params);
  
}

$("#accountForm").submit(function(event) {
  // Call our own AJAX function.
  submitForm();
  
  // Cancel the form submission, so we can use AJAX instead.
  event.preventDefault();
})
