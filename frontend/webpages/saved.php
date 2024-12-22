<?php
// checks database connection cause it is needed for troubleshooting
require_once('../src/database-applicare.php'); 

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$is_logged_in = isset($_SESSION['user_id']);


if ($is_logged_in) {
    $user_id = $_SESSION['user_id'];
    echo "User ID: " . $_SESSION['user_id']; // This should output the user ID.

    
$query = "SELECT p.id, p.name, p.type, p.area, p.description, p.image_url, p.purchase_url, p.video_url, sp.notes
          FROM saved_parts sp
          JOIN parts p ON sp.part_id = p.id
          WHERE sp.user_id = ?";

$stmt = $db->prepare($query);

if (!$stmt) {
    die("Query preparation failed: " . $db->error);
}

$stmt->bind_param("i", $user_id);

if (!$stmt->execute()) {
    die("Query execution failed: " . $stmt->error);
}

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "No results found for User ID: " . htmlspecialchars($user_id);
} else {
    echo "<h1>Results</h1>";
    while ($row = $result->fetch_assoc()) {
        echo "<pre>";
        print_r($row);
        echo "</pre>";
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recommended Parts</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
</head>
<body>
    <?php include('../common/header.php'); ?>
    <div class="container mt-5">
        <h1>Saved Parts</h1>

        <?php if ($result->num_rows > 0): ?>
            <div class="row">
                <?php while ($part = $result->fetch_assoc()): ?>
                    <div class="col-md-4">
                        <div class="card">
                            <?php if ($part['image_url']): ?>
                                <img src="<?= $part['image_url']; ?>" class="card-img-top" alt="<?= $part['name']; ?>">
                            <?php endif; ?>
                            <div class="card-body">
                                <h5 class="card-title"><?= $part['name']; ?></h5>
                                <p class="card-text"><?= $part['description']; ?></p>
                                <p><strong>Type:</strong> <?= $part['type']; ?></p>
                                <p><strong>Area:</strong> <?= $part['area']; ?></p>

                                <?php if ($part['purchase_url']): ?>
                                    <a href="<?= $part['purchase_url']; ?>" class="btn btn-primary" target="_blank">Buy Now</a>
                                <?php endif; ?>

                                <?php if ($part['video_url']): ?>
                                    <a href="<?= $part['video_url']; ?>" class="btn btn-secondary" target="_blank">Watch Video</a>
                                <?php endif; ?>

                                <?php if ($part['notes']): ?>
                                    <div class="mt-3">
                                        <strong>Notes:</strong>
                                        <p><?= nl2br($part['notes']); ?></p>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div>
        <?php else: ?>
            <p>You have no saved parts.</p>
        <?php endif; ?>
    </div>

    <?php include('../common/footer.php'); ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>