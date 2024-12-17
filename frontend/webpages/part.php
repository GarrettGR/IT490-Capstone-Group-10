<?php
// checks database connection cause it is needed for troubleshooting
require_once('../src/database-applicare.php');

// Check if all required parameters are present
if (isset($_GET['appliance_id'], $_GET['brand_id'], $_GET['model_id'], $_GET['area_id'], $_GET['issue_id'])) {
    $appliance_id = $_GET['appliance_id'];
    $brand_id = $_GET['brand_id'];
    $model_id = $_GET['model_id'];
    $area_id = $_GET['area_id'];
    $issue_id = $_GET['issue_id'];

    // Database connection and fetching relevant parts
    $query = '
        SELECT parts.part_name, parts.part_image, parts.part_link, parts.instructions_video
        FROM parts
        JOIN issue_types ON parts.part_id = issue_types.issue_id
        JOIN problem_areas ON issue_types.area_id = problem_areas.area_id
        JOIN brands b1 ON problem_areas.appliance_id = b1.appliance_id
        JOIN models ON models.brand_id = b1.brand_id
        JOIN brands b2 ON models.brand_id = b2.brand_id
        JOIN appliances ON b1.appliance_id = appliances.appliance_id
        WHERE appliances.appliance_id = :appliance_id
          AND b1.brand_id = :brand_id
          AND models.model_id = :model_id
          AND problem_areas.area_id = :area_id
          AND issue_types.issue_id = :issue_id
    ';
    
    $statement = $db->prepare($query);
    $statement->bindValue(':appliance_id', $appliance_id, PDO::PARAM_INT);
    $statement->bindValue(':brand_id', $brand_id, PDO::PARAM_INT);
    $statement->bindValue(':model_id', $model_id, PDO::PARAM_INT);
    $statement->bindValue(':area_id', $area_id, PDO::PARAM_INT);
    $statement->bindValue(':issue_id', $issue_id, PDO::PARAM_INT);
    $statement->execute();
    $parts = $statement->fetchAll(PDO::FETCH_ASSOC);
    $statement->closeCursor();

    // Check if parts are found for the selected issue
    if ($parts) {
        // Use the first part found as the recommended part
        $recommended_part = $parts[0];
    } else {
        // No parts found
        $recommended_part = null;
    }
} else {
    // If required parameters are missing, redirect to 'our-services.php'
    header('Location: our-services.php');
    exit;
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

    <div class="container py-5">
        <h1 class="text-center mb-4">Recommended Part</h1>
        
        <?php if ($recommended_part): ?>
            <div class="card mx-auto" style="max-width: 600px;">
                <img src="<?= htmlspecialchars($recommended_part['part_image']); ?>" class="card-img-top" alt="Part Image">
                <div class="card-body">
                    <h5 class="card-title"><?= htmlspecialchars($recommended_part['part_name']); ?></h5>
                    <div class="d-flex justify-content-center gap-2">
                        <a href="<?= htmlspecialchars($recommended_part['part_link']); ?>" class="btn btn-primary" target="_blank">Buy Part</a>
                        <?php if ($recommended_part['instructions_video']): ?>
                            <a href="<?= htmlspecialchars($recommended_part['instructions_video']); ?>" class="btn btn-secondary" target="_blank">Watch Instructions</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        <?php else: ?>
            <div class="alert alert-warning text-center">
                No recommended parts found for the selected issue.
            </div>
        <?php endif; ?>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
