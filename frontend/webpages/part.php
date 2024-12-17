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
        JOIN issues_parts ON parts.part_id = issues_parts.part_id
        JOIN issue_types ON issues_parts.issue_id = issue_types.issue_id
        JOIN problem_areas ON issue_types.area_id = problem_areas.area_id
        JOIN brands b1 ON problem_areas.appliance_id = b1.appliance_id
        JOIN models ON models.brand_id = b1.brand_id
        WHERE b1.appliance_id = :appliance_id
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

    if (!$parts) {
        echo "No parts found. Check database entries and query conditions.";
    } else {
        var_dump($parts); // Display fetched parts for debugging
    }
    
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

$zip_code = '';

// Check if a zip code (or area) is provided
$zip_code = isset($_GET['zip_code']) ? $_GET['zip_code'] : '';

// If zip code is provided, create a dynamic search query for Google Maps
if ($zip_code) {
    $searchQuery = "handyman+" . urlencode($zip_code);
    $useSearchMap = true; // Flag to indicate dynamic search map
} else {
    // Default location if no zip code is provided
    $searchQuery = "handyman+New+Jersey"; // Default location
    $useSearchMap = false; // Flag for static map
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

        <!-- Form to collect Zip Code input -->
        <h3 class="mt-5 text-center">Find Nearby Handymen</h3>
        <h4 class="mt-5 text-center">Enter Zip Code</42>
        <form method="get" action="" class="text-center mb-4">
            <input type="text" name="zip_code" placeholder="Enter Zip Code" value="<?= htmlspecialchars($zip_code); ?>" class="form-control w-50 d-inline" required>
            <button type="submit" class="btn btn-primary">Search</button>
        </form>

        <!-- Google Maps Iframe to search for Handymen -->
        <?php
        // Example location for searching handymen, could be dynamic based on 'area_id'
        $location = "New+Jersey"; // You could dynamically populate this
        $searchQuery = "handyman+" . urlencode($location);
        ?>
        <div class="text-center">
        <?php if ($useSearchMap): ?>
                <!-- Dynamic Google Maps Search based on zip code -->
                <iframe 
                    src="https://www.google.com/maps/embed/v1/search?q=<?= $searchQuery; ?>&key=YOUR_GOOGLE_MAPS_API_KEY" 
                    width="100%" 
                    height="500" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
            <?php else: ?>
                <!-- Static Google Map with predefined coordinates -->
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12091.640837505438!2d-74.19203265527406!3d40.74200124412969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2534cc006098b%3A0xfac623bce8f114d8!2sMaple%20Hall%20NJIT!5e0!3m2!1sen!2sus!4v1696634464882!5m2!1sen!2sus" 
                    width="100%" 
                    height="500" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
            <?php endif; ?>

        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
