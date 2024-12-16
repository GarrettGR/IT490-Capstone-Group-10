<?php
// checks database connection cause it is needed for troubleshooting
require_once('../src/database-applicare.php'); 
 
// Fetch all appliances from the appliances table
$queryAppliances = 'SELECT * FROM appliances ORDER BY appliance_id';
$statement = $db->prepare($queryAppliances);
$statement->execute();
$appliances = $statement->fetchAll(PDO::FETCH_ASSOC); // Fetch as an associative array
$statement->closeCursor();


// fetch brands if appliance_id is sent via AJAX
if (isset($_POST['appliance_id'])) {
    $queryBrands = 'SELECT * FROM brands WHERE appliance_id = :appliance_id';
    $statement = $db->prepare($queryBrands);
    $statement->bindValue(':appliance_id', $_POST['appliance_id'], PDO::PARAM_INT);
    $statement->execute();
    $brands = $statement->fetchAll(PDO::FETCH_ASSOC);
    $statement->closeCursor();

    // Return brands as JSON for AJAX
    echo json_encode($brands);
    exit;
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
                        <a href="appliance.php?id=' . htmlspecialchars($appliance['appliance_id']) . '" class="text-decoration-none">
                            <div class="card">
                                <img src="' . htmlspecialchars($image) . '" class="card-img-top" alt="' . htmlspecialchars($appliance['appliance_name']) . '">
                                <div class="card-body">
                                    <h5 class="card-title">' . htmlspecialchars($appliance['appliance_name']) . '</h5>
                                    <p class="card-text">' . htmlspecialchars($appliance['description']) . '</p>
                                </div>
                            </div>
                        </a>
                    </div>';
                    
                }
                ?>
            </div>
        </div>
    </section>

<section class="brand-selection-section py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <h3 class="text-center">Select Brand</h3>
                    <select id="brand" class="form-select" style="display: none;">
                        <option value="" disabled selected>Select a brand</option>
                    </select>
                </div>
            </div>
        </div>
    </section>
    <?php include('../common/footer.php'); ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.reflowhq.com/v2/toolkit.min.js"></script>
    <script src="assets/js/bs-init.js"></script>
    <script src="assets/js/startup-modern.js"></script>

    <script>
        // Handle appliance button click
        $(document).on('click', '.select-appliance', function () {
            var applianceId = $(this).data('appliance-id');

            if (applianceId) {
                // Fetch brands via AJAX
                $.ajax({
                    url: '', // Current file handles the request
                    method: 'POST',
                    data: { appliance_id: applianceId },
                    success: function (response) {
                        var brands = JSON.parse(response);
                        var brandSelect = $('#brand');

                        // Populate the dropdown
                        brandSelect.empty().append('<option value="" disabled selected>Select a brand</option>');
                        brands.forEach(function (brand) {
                            brandSelect.append('<option value="' + brand.brand_id + '">' + brand.brand_name + '</option>');
                        });

                        // Show the dropdown
                        brandSelect.show();
                    },
                    error: function () {
                        alert('Error fetching brands. Please try again.');
                    }
                });
            }
        });
    </script>
</body>


</html>