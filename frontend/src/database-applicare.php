<?php
    // Database connection details
    $host = "159.223.183.25";
    $username = "admin";
    $password = "student123";
    $dbname = "mysql:host=$host;dbname=$username";

    try {
        // Create a PDO instance with the appropriate error mode and connection string
        $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        
        // Set the PDO error mode to exception
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // You are successfully connected
        echo '<p>You are connected to the database.</p>';
    } catch (PDOException $exception) {
        // If there is an error connecting, capture the error message
        $error_message = $exception->getMessage();

        // Display the error message on failure
        echo "<p>Database Error</p>";
        echo "<p>There was an error connecting to the database.</p>";
        echo "<p>Error Message: $error_message</p>";

        exit();
    }
?>
