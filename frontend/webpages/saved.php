<?php
// checks database connection cause it is needed for logging in 
require_once('../src/database-applicare.php'); 

// Start the session only if it's not already active
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
var_dump($_SESSION);  // Add this to debug the session

$is_logged_in = isset($_SESSION['user_id']); // assuming 'user_id' is stored in session upon login

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id']; // retrieve the user ID from session
    
    // Query to fetch saved parts from saved_parts table and join with part table
    $query = "
        SELECT sp.*, p.id AS part_id, p.part_name, p.description, p.image_url
        FROM saved_parts sp
        JOIN parts p ON sp.part_id = p.id
        WHERE sp.user_id = ?

    ";

    
        // Debug the SQL query
        echo "Executing Query: " . htmlspecialchars($query); // Show query being executed
        echo "<pre>" . htmlspecialchars($user_id) . "</pre>";  // Debug user_id

    $stmt = $db->prepare($query);
    $stmt->bind_param("i", $user_id);
    if (!$stmt->execute()) {
        echo "Error: " . $stmt->error;
    } else {
        $result = $stmt->get_result();
        var_dump($result);
    }

} else {
    // No saved parts if not logged in
    $result = [];
}
?>

<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Applicare</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.reflowhq.com/v2/toolkit.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&amp;display=swap">
    <link rel="stylesheet" href="assets/css/bs-theme-overrides.css">
    <link rel="stylesheet" href="assets/css/Login-Form-Basic-icons.css">
</head>

<body>
    <!-- <?php include('../common/header.php'); ?>

    <?php if (!$is_logged_in): ?>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Notice!</strong> You are not logged in. Please <a href="login.php" class="alert-link">Login</a> to access your account.    
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    <?php endif; ?>

    <section class="py-5">
        <div class="container py-5">
            <h2>Your Saved Parts</h2>
                <?php if ($result && $result->num_rows > 0): ?>
                    <div class="row">
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <pre><?php var_dump($row); ?></pre> <!-- Debugging output -->
                        <div class="col-sm-4 col-md-3 mb-4">
                            <div class="card">
                                <img src="<?= $row['image_url']; ?>" class="card-img-top" alt="Part Image">
                                <div class="card-body">
                                    <h5 class="card-title"><?= $row['part_name']; ?></h5>
                                    <p class="card-text"><?= $row['description']; ?></p>
                                    <a href="view_part.php?id=<?= $row['part_id']; ?>" class="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                    <?php endwhile; ?>
                    </div>
            <?php else: ?>
                <p>No saved parts found.</p>
            <?php endif; ?>
         </div>
    </section>

    <?php include('../common/footer.php'); ?> -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.reflowhq.com/v2/toolkit.min.js"></script>
    <script src="assets/js/bs-init.js"></script>
    <script src="assets/js/startup-modern.js"></script>
</body>

</html>