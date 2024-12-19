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
$appliances = fetchData('SELECT * FROM appliances ORDER BY id');
$brands = $models = $parts = $common_problems = [];
$appliance_id = $brand_id = $model_id = $area_id = null;
// Sanitize and fetch appliance ID
if (isset($_GET['appliance_id'])) {
    $appliance_id = filter_input(INPUT_GET, 'appliance_id', FILTER_VALIDATE_INT);
    $parts = fetchData('SELECT * FROM problem_areas WHERE id = :appliance_id', [
        ':appliance_id' => ['value' => $appliance_id, 'type' => PDO::PARAM_INT]
    ]);
}

// Fetch brands based on selected appliance type
if (isset($_GET['appliance_id'])) {
    $appliance_id = filter_input(INPUT_GET, 'appliance_id', FILTER_VALIDATE_INT);
    $brands = fetchData('SELECT DISTINCT brand FROM appliances WHERE id = :appliance_id', [
        ':appliance_id' => ['value' => $appliance_id, 'type' => PDO::PARAM_INT]
    ]);
}

// fetch models based on selected appliance type and brand
if(isset($_GET['appliance_id']) && isset($_GET['brand'])){
    $appliance_id = filter_input(INPUT_GET, 'appliance_id', FILTER_VALIDATE_INT);
    $brand = filter_input(INPUT_GET, 'brand', FILTER_SANITIZE_STRING);
    $models = fetchData('SELECT DISTINCT model FROM appliances WHERE type = :type AND brand = :brand', [
        ':type' => ['value' => $_GET['type'], 'type' => PDO::PARAM_STR],
        ':brand' => ['value' => $brand, 'type' => PDO::PARAM_STR]
    ]);
}

// Fetch parts common problems
if (isset($_GET['id'])) {
    $problem_id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
    $common_problems = fetchData('SELECT * FROM common_problems WHERE appliance_id = :appliance_id', [
        ':id' => ['value' => $id, 'type' => PDO::PARAM_INT]
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

    <section class="search-bar py-3">
        <div class="container">
            <form method="get" action="" class="d-flex">
                <input type="text" name="search" class="form-control me-2" placeholder="Search appliances..." value="<?= htmlspecialchars($search); ?>">
                <button type="submit" class="btn btn-primary">Search</button>
            </form>
        </div>
    </section>

    <section class="appliance-cards-section py-5">
        <div class="container">
            <div class="row">
                <?php foreach ($appliances as $appliance) {
                    $image = '';
                    switch ($appliance['type']) {
                        case 'Washer':
                            $image = 'assets/img/appliances/washer.jpeg';
                            echo $image;
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

                
                    echo '
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="' . $image . '" class="card-img-top" alt="' . htmlspecialchars($appliance['type']) . '">
                            <div class="card-body text-center">
                                <h5 class="card-title">' . $appliance['type'] . '</h5>
                                <p class="card-text">' . $appliance['description'] . '</p>
                                <a href="?appliance_id=' . $appliance['id'] . '" class="btn btn-primary">Select Brand</a>

                            </div>
                        </div>
                       
                    </div>';
                    
                }
                ?>
            </div>
        </div>
    </section>

    <?php if (isset($_GET['id']) && !empty($brands)) : ?>
        <section class="brand-selection py-5">
            <div class="container">
                <h2>Select Brand</h2>
                <form method="get" action="">
                    <input type="hidden" name="appliance_id" value="<?php echo $_GET['appliance_id']; ?>">
                    <select class="form-select form-select-lg mb-3" name="brand" onchange="this.form.submit()">
                        <option value="" disabled selected>Select a brand</option>
                        <?php foreach ($brands as $brand) : ?>
                            <option value="<?= $brand['brand']; ?>"
                                <?= isset($_GET['brand']) && $_GET['brand'] == $brand['brand'] ? 'selected' : ''; ?>>
                                <?= htmlspecialchars($brand['name']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </form>
            </div>
        </section>
    <?php endif; ?>

    <?php if (isset($_GET['brand']) && !empty($models)) : ?>
        <section class="model-selection py-5">
            <div class="container">
                <h2>Select Model</h2>
                <form method="get" action="">
                    <input type="hidden" name="appliance_id" value="<?php echo $_GET['id']; ?>">
                    <input type="hidden" name="brand_id" value="<?php echo $_GET['brand_id']; ?>">
                    <select class="form-select form-select-lg mb-3" name="model_id" onchange="this.form.submit()">
                        <option value="" disabled selected>Select a model</option>
                        <?php foreach ($models as $model) : ?>
                            <option value="<?= $model['model_id']; ?>"
                                <?= isset($_GET['model_id']) && $_GET['model_id'] == $model['model_id'] ? 'selected' : ''; ?>>
                                <?= htmlspecialchars($model['name']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </form>
            </div>
        </section>
    <?php endif; ?>

    <?php if (isset($_GET['model_id']) && !empty($parts)) : ?>
        <section class="parts-selection py-5">
            <div class="container">
                <h2>Select Part</h2>
                <form method="get" action="">
                    <input type="hidden" name="appliance_id" value="<?php echo $_GET['appliance_id']; ?>">
                    <input type="hidden" name="brand_id" value="<?php echo $_GET['brand_id']; ?>">
                    <input type="hidden" name="model_id" value="<?php echo $_GET['model_id']; ?>">
                    <select class="form-select form-select-lg mb-3" name="area_id" onchange="this.form.submit()">
                        <option value="" disabled selected>Select a part</option>
                        <?php foreach ($parts as $part) : ?>
                            <option value="<?= $part['area_id']; ?>"
                                <?= isset($_GET['area_id']) && $_GET['area_id'] == $part['area_id'] ? 'selected' : ''; ?>>
                                <?= htmlspecialchars($part['area_name']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </form>
            </div>
        </section>
    <?php endif; ?>

    <?php if (isset($_GET['area_id']) && !empty($issues)) : ?>
        <section class="issue-selection py-5">
            <div class="container">
                <h2>Select Issue</h2>
                <form method="get" action="">
                    <input type="hidden" name="appliance_id" value="<?php echo $_GET['appliance_id']; ?>">
                    <input type="hidden" name="brand_id" value="<?php echo $_GET['brand_id']; ?>">
                    <input type="hidden" name="model_id" value="<?php echo $_GET['model_id']; ?>">
                    <input type="hidden" name="area_id" value="<?php echo $_GET['area_id']; ?>">
                    <select class="form-select form-select-lg mb-3" name="issue_id" onchange="this.form.submit()">
                        <option value="" disabled selected>Select an issue</option>
                        <?php foreach ($issues as $issue) : ?>
                            <option value="<?= $issue['issue_id']; ?>"
                                <?= isset($_GET['issue_id']) && $_GET['issue_id'] == $issue['issue_id'] ? 'selected' : ''; ?>>
                                <?= htmlspecialchars($issue['issue_description']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </form>
            </div>
        </section>
    <?php endif; ?>

    <?php if (isset($_GET['issue_id'])): ?>
        <!-- Button to redirect to the part page with the selected issue -->
        <div class="text-center my-4">
            <a href="part.php?appliance_id=<?= $_GET['appliance_id']; ?>&brand_id=<?= $_GET['brand_id']; ?>&model_id=<?= $_GET['model_id']; ?>&area_id=<?= $_GET['area_id']; ?>&issue_id=<?= $_GET['issue_id']; ?>"
                class="btn btn-primary mt-3">View Recommended Parts</a>
        </div>
    <?php endif; ?>

    <?php include('../common/footer.php'); ?>

    <script>
        // Automatically scroll to the anchor section if it exists in the URL
        document.addEventListener('DOMContentLoaded', function () {
            const hash = window.location.hash;
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
        document.addEventListener('DOMContentLoaded', function () {
        const viewPartsButton = document.getElementById('viewPartsButton');
        if (viewPartsButton) {
            viewPartsButton.addEventListener('click', function (event) {
                viewPartsButton.classList.add('disabled');
                viewPartsButton.textContent = 'Loading...';
            });
        }
    });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.reflowhq.com/v2/toolkit.min.js"></script>
    <script src="assets/js/bs-init.js"></script>
    <script src="assets/js/startup-modern.js"></script>

</body>


</html>