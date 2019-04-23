<?php

  require_once(dirname(__FILE__) . '/db.php');

  $db = new db();
  
  // Get POST data and validate.
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = validateInput($_POST['username']);
    $email = validateInput($_POST['email']);
    $password = validateInput($_POST['password']);
  }
  
  if (!isset($username) || !is_string($username))
    throw new InvalidArgumentException("Username is invalid or empty.");
  
  if (!isset($password) || !is_string($password))
    throw new InvalidArgumentException("Password is invalid or empty.");
  
  if (!isset($email))
    throw new InvalidArgumentException("Email is empty.");
  
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "1"; // Returns that email is invalid, to update status message.
    return;
  }

  try {
    
    // First, we need to check if the account name already exists.
    $accountCheckQuery = "SELECT * FROM account WHERE username = ?";
    $accountCheckParams = array($username);
    
    $results = $db->queryMultiRow($accountCheckQuery, $accountCheckParams);
    
    if ($db->getRowCount($results) > 0) {
      
      // Account already exists, inform user and stop transaction.
      echo "2";
      
      // Close connection to the database.
      $db->close();
      
      return;
    }
    
    // If no account exists, create a new one.
    
    // Get the SHA1 encrypted password.
    $shaPassword = $db->getShaPasswordHash($username, $password);
    
    $accountCreateQuery = "INSERT INTO account(username, sha_pass_hash, email) VALUES(?, ?, ?)";
    $accountCreateParams = array($username, $shaPassword[0], $email);
    
    // Execute the query.
    $db->insertQuery($accountCreateQuery, $accountCreateParams);
    
    // Close connection to the database.
    $db->close();
    
    // Return successful to AJAX call.
    echo "0";
    
  }
  catch(PDOException $e) {
    echo "3"; // Update status message with unknown error occurred.
    error_log("PDO Database error occurred: " . $e->getMessage());
  }
  catch (Exception $e) {
    echo "3"; // Update status message with unknown error occurred.
    error_log("Unknown error occurred: " . $e->getMessage());
  }
  
  // Validates POST input data.
  function validateInput($param) {
    $param = trim($param);
    $param = stripslashes($param);
    $param = htmlspecialchars($param);
    
    return $param;
  }

?>
