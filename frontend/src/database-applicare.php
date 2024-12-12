<?php
    // Database connection details
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mysql:host=$host;dbname=applicare";

    try {
        // Create a PDO instance with the appropriate error mode and connection string
        $db = new PDO($dbname, $username, $password);
        
    } catch (PDOException $exception) {
        // If there is an error connecting, capture the error message
        $error_message = $exception->getMessage();

        // Display the error message on failure
        echo "<p>Database Error</p>";
        echo "<p>There was an error connecting to the database.</p>";
        echo "<p>Error Message: $error_message</p>";

        exit();
    }