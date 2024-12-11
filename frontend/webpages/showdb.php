<!-- Jasmin Rutter, 2/17/23, IT 202-010, Unit 3 Fruit Stand, jnr7@njit.edu -->

<?php 
require('../src/database-applicare.php');

// Get all users from the users table
$queryUsers = 'SELECT * FROM users ORDER BY user_id';
$statement = $db->prepare($queryUsers);
$statement->execute();
$users = $statement->fetchAll();
$statement->closeCursor();

// Check if the user is logged in
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
    <title>Applicare Users</title> 
    <link rel="shortcut icon" href="images/icon.jpg">
</head>
<body>
    <h1>Users List</h1>

    <center>
    <?php include('../common/header.php'); ?>

    <main>
        <section>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($users as $user) : ?> <!-- Using the variable made in line 10 to get the users from the users table -->
                    <tr>
                        <td><?php echo $user['user_id']; ?></td>
                        <td><?php echo $user['first_name']; ?></td>
                        <td><?php echo $user['last_name']; ?></td>
                        <td><?php echo $user['email']; ?></td>
                    </tr>
                    <?php endforeach ?>
                </tbody>
            </table>
        </section>
    </main>

    <?php include('../common/footer.php'); ?>
    </center>
</body>
</html>
