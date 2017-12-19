function submitForm() {
  
  // Set the status message.
  var statusMessage = "Please wait...";
  document.getElementById("statusMessage").value = statusMessage;
  
  // Get the form input.
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  
  // Validate form input.
  if (username == "") {
    document.getElementById("alert-content").innerHTML = "Please enter a username.";
    $("alert").removeclass("hide").addClass("show");
  }
  
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
      // If the transaction was successful, update the status message.
      if (xhr.responseText == "0")
        document.getElementById("statusMessage").value = "Account created successfully!";
      
      else if (xhr.responseText == "1")
        document.getElementById("statusMessage").value = "Email is invalid.";
      
      else if (xhr.responseText == "2")
        document.getElementById("statusMessage").value = "Account already exists.";
      
      else if (xhr.responseText == "3")
        document.getElementById("statusMessage").value = "Unknown error occurred. Please try again.";
      
      // DEBUG
      else
        document.write(xhr.responseText);
    }
  }
  
  // Send the AJAX request.
  xhr.send(params);
  
}

$("#accountForm").submit(function(event) {
  // Cancel the form submission, so we can use AJAX instead.
  event.preventDefault();
  
  // Call our own AJAX function.
  submitForm();
})
