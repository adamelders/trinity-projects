<?php
  
  class db {
    
    private $conn;
    
    /* --------------------- ONLY EDIT THE VALUES BELOW THIS LINE --------------------- */
    
    private $host = "localhost";      // IP or hostname of your server.
    private $username = "username";   // Database username.
    private $password = "password";   // Database password.
    private $dbname = "auth";         // Database name (i.e. "auth").
    
    /* --------------------- DO NOT EDIT ANYTHING BELOW THIS LINE --------------------- */
    
    // Create the database connection when this class is instantiated.
    function __construct() {
      
      try {
        
        // Establish a new connection to the database.
        $connection = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->username, $this->password);
        
        // Set the PDO error mode to Exception.
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $this->conn = $connection;
      }
      catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
      }
    }
    
    // Executes an INSERT query on the database.
    public function insertQuery($query, $params) {
      if ($query) {
        try {
          $stmt = $this->conn->prepare($query);
          $stmt->execute($params);
        }
        catch (PDOException $e) {
          error_log("Error when inserting a new account: " . $e->getMessage());
        }
      }
    }
    
    // Fetches and returns the next row from the result set.
    public function querySingleRow($query, $params) {
      if ($query) {
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return $row;
      }
      else
        return null;
    }
    
    // Returns an array containing all of the result set rows.
    public function queryMultiRow($query, $params) {
      if ($query) {
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);
        
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $results;
      }
      else
        return null;
    }
    
    // Returns the row count from a PDO result set.
    public function getRowCount($results) {
      
      // We can use the count() function here, because the result set is either
      // an associative or numerical array.
      if ($results) {
        return count($results);
      }
    }
    
    // Returns the last inserted row or sequence.
    public function getLastInsertId() {
      return $this->conn->lastInsertId();
    }
    
    // Returns a SHA1 encrypted password from the database.
    // Note that the result is a numbered array, not associative.
    public function getShaPasswordHash($username, $password) {
      
      $query = "SELECT SHA1(CONCAT(UPPER(?), ':', UPPER(?)));";
      $params = array($username, $password);
      
      $stmt = $this->conn->prepare($query);
      $stmt->execute($params);
      $row = $stmt->fetch(PDO::FETCH_NUM);
      
      return $row;
    }
    
    // Close the database connection.
    public function close() {
      $this->conn = null;
    }
    
  }

?>
