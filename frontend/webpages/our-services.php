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
$appliances = fetchData('SELECT * FROM appliances ORDER BY appliance_id');

$brands = $models = $parts = $issues = [];
$appliance_id = $brand_id = $model_id = $area_id = null;

// Sanitize and fetch appliance ID
if (isset($_GET['appliance_id'])) {
    $appliance_id = filter_input(INPUT_GET, 'appliance_id', FILTER_VALIDATE_INT);
    $brands = fetchData('SELECT * FROM brands WHERE appliance_id = :appliance_id', [
        ':appliance_id' => ['value' => $appliance_id, 'type' => PDO::PARAM_INT]
    ]);
    $parts = fetchData('SELECT * FROM problem_areas WHERE appliance_id = :appliance_id', [
        ':appliance_id' => ['value' => $appliance_id, 'type' => PDO::PARAM_INT]
    ]);
}

// Fetch models
if (isset($_GET['brand_id'])) {
    $brand_id = filter_input(INPUT_GET, 'brand_id', FILTER_VALIDATE_INT);
    $models = fetchData('SELECT * FROM models WHERE brand_id = :brand_id', [
        ':brand_id' => ['value' => $brand_id, 'type' => PDO::PARAM_INT]
    ]);
}

// Fetch parts issues
if (isset($_GET['area_id'])) {
    $area_id = filter_input(INPUT_GET, 'area_id', FILTER_VALIDATE_INT);
    $issues = fetchData('SELECT * FROM issue_types WHERE area_id = :area_id', [
        ':area_id' => ['value' => $area_id, 'type' => PDO::PARAM_INT]
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
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&amp;display=swap">
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

    <section class="appliance-cards-section py-5">
        <div class="container">
            <div class="row">
                <?php foreach ($appliances as $appliance) {
                    $image = '';
                    switch ($appliance['appliance_name']) {
                        case 'Washers':
                            $image = 'https://image-us.samsung.com/SamsungUS/home/home-appliances/washers/front-load/pd/wf45t6000aw-a5/gallery/Gallery-WF45T6000AW-01-White-1600x1200.jpg?$product-details-jpg$';
                            break;
                        case 'Dryers':
                            $image = 'https://mobileimages.lowes.com/productimages/4fbb1116-847f-45ce-8cb4-f3fbe3428101/17585630.jpg';
                            break;
                        case 'Refrigerators':
                            $image = 'https://d1b5h9psu9yexj.cloudfront.net/55772/LG-LRFLC2706S_20230823-182245_full.jpeg';
                            break;
                        case 'Dishwashers':
                            $image = 'https://images.webfronts.com/cache/frouerpscico.jpg?imgeng=/w_500/h_500/m_letterbox_ffffff_100';
                            break;
                        case 'Microwaves':
                            $image = 'https://target.scene7.com/is/image/Target/GUEST_738eeb63-eb0c-415f-a2c1-0dcf6ad03ea1?wid=488&hei=488&fmt=pjpeg';
                            break;
                        case 'Ovens':
                            $image = 'https://mobileimages.lowes.com/productimages/06a6bba8-81e9-47ed-90ce-4a1f2b235af6/42672585.jpg';
                            break;
                        default:
                            $image = 'assets/images/default-appliance.jpg'; // Default image for unknown appliances
                            break;
                    }

                
                    echo '
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="' . $image . '" class="card-img-top" alt="' . htmlspecialchars($appliance['appliance_name']) . '">
                            <div class="card-body text-center">
                                <h5 class="card-title">' . $appliance['appliance_name'] . '</h5>
                                <p class="card-text">' . $appliance['description'] . '</p>
                                <a href="?appliance_id=' . $appliance['appliance_id'] . '" class="btn btn-primary">Select Brand</a>

                            </div>
                        </div>
                       
                    </div>';
                    
                }
                ?>
            </div>
        </div>
    </section>

    <?php if (isset($_GET['appliance_id']) && !empty($brands)) : ?>
        <section class="brand-selection py-5">
            <div class="container">
                <h2>Select Brand</h2>
                <form method="get" action="">
                    <input type="hidden" name="appliance_id" value="<?php echo $_GET['appliance_id']; ?>">
                    <select class="form-select form-select-lg mb-3" name="brand_id" onchange="this.form.submit()">
                        <option value="" disabled selected>Select a brand</option>
                        <?php foreach ($brands as $brand) : ?>
                            <option value="<?= $brand['brand_id']; ?>"
                                <?= isset($_GET['brand_id']) && $_GET['brand_id'] == $brand['brand_id'] ? 'selected' : ''; ?>>
                                <?= htmlspecialchars($brand['name']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </form>
            </div>
        </section>
    <?php endif; ?>

    <?php if (isset($_GET['brand_id']) && !empty($models)) : ?>
        <section class="model-selection py-5">
            <div class="container">
                <h2>Select Model</h2>
                <form method="get" action="">
                    <input type="hidden" name="appliance_id" value="<?php echo $_GET['appliance_id']; ?>">
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