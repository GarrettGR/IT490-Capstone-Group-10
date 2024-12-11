<?php
    // Database connection details
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mysql:host=$host;dbname=applicare";

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
    // Check if the user is logged in
    session_start();
    if (isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];

        // Get all users from the users table
        $queryUsers = 'SELECT * FROM users ORDER BY user_id';
        $statement = $db->prepare($queryUsers);
        $statement->execute();
        $users = $statement->fetchAll();
        $statement->closeCursor();
        
        // Display users or further process the data
        echo '<pre>';
        print_r($users);
        echo '</pre>';
    } else {
        // If no user is logged in, prompt to log in
        echo "<p>Please log in to view the users.</p>";
    }
?>
