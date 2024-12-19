<?php
// checks database connection cause it is needed for troubleshooting
require_once('../src/database-applicare.php'); 
 
/// Helper function to fetch data with prepared statements
function fetchData($query, $parameters = []) {
    global $db;
    try {
        $statement = $db->prepare($query);
        foreach ($parameters as $param => $value) {
            $statement->bindValue($param, $value['value'], $value['type']);
        }
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        $statement->closeCursor();
        return $result;
    } catch (PDOException $e) {
        // Log error instead of exposing it
        error_log("Database error: " . $e->getMessage());
        return [];
    }
}

// Fetch all appliances
$appliances = fetchData('SELECT * FROM appliances');
// Sanitize and fetch appliance ID
if (isset($_GET['appliance_id'])) {
    $appliance_id = filter_input(INPUT_GET, 'appliance_id', FILTER_VALIDATE_INT);
    $parts = fetchData('SELECT * FROM parts WHERE appliance_id = :appliance_id', [
        ':appliance_id' => ['value' => $appliance_id, 'type' => PDO::PARAM_INT]
    ]);
}

// Fetch common problems for specific appliances (based off of type, brand, model, area)
if (isset($_GET['appliance_id'])) {
    $appliance_id = filter_input(INPUT_GET, 'appliance_id', FILTER_VALIDATE_INT);
    $common_problems = fetchData('SELECT * FROM common_problems WHERE appliance_id = :appliance_id', [
        ':appliance_id' => ['value' => $appliance_id, 'type' => PDO::PARAM_INT]
    ]);
}

// fetch parts based on selected appliance type and area
if(isset($_GET['appliance_id']) && isset($_GET['brand'])){
    $appliance_id = filter_input(INPUT_GET, 'appliance_id', FILTER_VALIDATE_INT);
    $area = filter_input(INPUT_GET, 'area', FILTER_SANITIZE_STRING);
    $parts = fetchData('SELECT * FROM parts WHERE appliance_id = :appliance_id AND area = :area', [
        ':appliance_id' => ['value' => $appliance_id, 'type' => PDO::PARAM_STR],
        ':area' => ['value' => $area, 'type' => PDO::PARAM_STR]
    ]);
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
    <link rel="stylesheet" href="assets/css/bs-theme-overrides.css">
    <link rel="stylesheet" href="assets/css/Login-Form-Basic-icons.css">
</head>

<body>
    <?php include('../common/header.php'); ?>
    <header class="pt-5">
        <div class="container pt-4 pt-xl-5">
            <div class="row pt-5">
                <div class="col-md-8 text-center text-md-start mx-auto">
                    <div class="text-center">
                        <h1 class="display-4 fw-bold mb-5">Our Supported Appliances</h1>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- <section class="search-bar py-3">
        <div class="container">
            <form method="get" action="" class="d-flex">
                <input type="text" name="search" class="form-control me-2" placeholder="Search appliances..." value="<?= htmlspecialchars($search); ?>">
                <button type="submit" class="btn btn-primary">Search</button>
            </form>
        </div>
        <?php
        // Handle search functionality
        if (isset($_GET['search']) && !empty(trim($_GET['search']))) {
            $searchTerm = '%' . trim($_GET['search']) . '%';
            $query = "SELECT * FROM appliances WHERE type LIKE :search OR brand LIKE :search OR model LIKE :search";
            $appliances = fetchData($query, ['search' => ['value' => $searchTerm, 'type' => PDO::PARAM_STR]]);
        }
        ?>
    </section>

    <?php if (empty($appliances)): ?>
        <p>No appliances found.</p>
    <?php else: ?>
        <?php foreach ($appliances as $appliance): ?> 
            <div class="card mb-3">
                <div class="card-body">
                <h3><?php echo htmlspecialchars($appliance['type']); ?> - <?php echo htmlspecialchars($appliance['brand']); ?></h3>
                    <p><strong>Model:</strong> <?php echo htmlspecialchars($appliance['model']); ?></p>
                    <p><?php echo nl2br(htmlspecialchars($appliance['description'])); ?></p>
                    <p><small>Added on: <?php echo htmlspecialchars($appliance['created_at']); ?></small></p>

                    <?php
                    $image = '';
                    switch ($appliance['type']) {
                        case 'Washer':
                            $image = 'assets/img/appliances/washer.jpeg';
                            break;
                        case 'Dryer':
                            $image = 'assets/img/appliances/dryer.jpeg';
                            break;
                        case 'Refrigerator':
                            $image = 'assets/img/appliances/fridge.jpeg';
                            break;
                        case 'Dishwasher':
                            $image = 'assets/img/appliances/dishwasher.jpg';
                            break;
                        case 'Microwave':
                            $image = 'assets/img/appliances/microwave.jpg';
                            break;
                        case 'Oven':
                            $image = 'assets/img/appliances/oven.jpeg';
                            break;
                        default:
                            $image = 'assets/img/appliances/default-appliance.jpg'; // Default image for unknown appliances
                            break;
                    }
                    ?>
                    <img src="<?php echo $image; ?>" alt="Image of <?php echo htmlspecialchars($appliance['type']); ?>" class="img-fluid mb-3">

                    <button class="btn btn-outline-primary" onclick="toggleDropdown(<?php echo $appliance['id']; ?>)">Select Issue</button>
                    <div class="dropdown mt-3" id="dropdown-<?php echo $appliance['id']; ?>" style="display: none;">
                        <label for="brand-<?php echo $appliance['id']; ?>">Brand:</label>
                        <select id="brand-<?php echo $appliance['id']; ?>" class="form-select mb-2" onchange="handleBrandSelection(<?php echo $appliance['id']; ?>, this.value)">
                            <option value="">Select Brand</option>
                            <option value="<?php echo htmlspecialchars($appliance['brand']); ?>"><?php echo htmlspecialchars($appliance['brand']); ?></option>
                        </select>
                        <label for="model-<?php echo $appliance['id']; ?>">Model:</label>
                        <select id="model-<?php echo $appliance['id']; ?>" class="form-select mb-2">
                            <option value="">Select Model</option>
                            <option value="<?php echo htmlspecialchars($appliance['model']); ?>"><?php echo htmlspecialchars($appliance['model']); ?></option>
                        </select>
                        <label for="area-<?php echo $appliance['id']; ?>">Area:</label>
                        <select id="area-<?php echo $appliance['id']; ?>" class="form-select mb-2">
                            <option value="">Select Area</option>
                            <option value="Door">Door</option>
                            <option value="Motor">Motor</option>
                            <option value="Filter">Filter</option>
                        </select>
                        <label for="problem-<?php echo $appliance['id']; ?>">Problem:</label>
                        <select id="problem-<?php echo $appliance['id']; ?>" class="form-select mb-2">
                            <option value="">Select Problem</option>
                            <option value="Won't Start">Won't Start</option>
                            <option value="Noisy Operation">Noisy Operation</option>
                            <option value="Leaking">Leaking</option>
                        </select>
                        <button class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div> -->

    <?php include('../common/footer.php'); ?>

    <!-- <script>
        function toggleDropdown(id) {
            const dropdown = document.getElementById(`dropdown-${id}`);
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }

        function handleBrandSelection(id, brand) {
            // Example: Fetch models dynamically based on brand
            console.log(`Selected brand for appliance ${id}: ${brand}`);
        }

    </script> -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.reflowhq.com/v2/toolkit.min.js"></script>
    <script src="assets/js/bs-init.js"></script>
    <script src="assets/js/startup-modern.js"></script>

</body>


</html>