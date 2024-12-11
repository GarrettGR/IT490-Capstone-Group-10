<?php
// checks database connection cause it is needed for troubleshooting
include('../src/database-applicare.php'); 

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
                <?php
                // different appliances 
                $appliances = [
                    ['id' => 1, 'name' => 'Washers', 'image' => 'https://image-us.samsung.com/SamsungUS/home/home-appliances/washers/front-load/pd/wf45t6000aw-a5/gallery/Gallery-WF45T6000AW-01-White-1600x1200.jpg?$product-details-jpg$', 'description' => 'Troubleshoot issues with washing performance, leaks, and spinning.'],
                    ['id' => 2, 'name' => 'Dryers', 'image' => 'https://mobileimages.lowes.com/productimages/4fbb1116-847f-45ce-8cb4-f3fbe3428101/17585630.jpg', 'description' => 'Resolve heating, tumbling, and drying problems.'],
                    ['id' => 3, 'name' => 'Refrigerators', 'image' => 'https://d1b5h9psu9yexj.cloudfront.net/55772/LG-LRFLC2706S_20230823-182245_full.jpeg', 'description' => 'Fix cooling, temperature regulation, and ice maker issues.'],
                    ['id' => 4, 'name' => 'Dishwashers', 'image' => 'https://images.webfronts.com/cache/frouerpscico.jpg?imgeng=/w_500/h_500/m_letterbox_ffffff_100', 'description' => 'Get help with drainage, cleaning, and drying cycles.'],
                    ['id' => 5, 'name' => 'Microwaves', 'image' => 'https://target.scene7.com/is/image/Target/GUEST_738eeb63-eb0c-415f-a2c1-0dcf6ad03ea1?wid=488&hei=488&fmt=pjpeg', 'description' => 'Troubleshoot heating, power, and display issues.'],
                    ['id' => 6, 'name' => 'Ovens', 'image' => 'https://mobileimages.lowes.com/productimages/06a6bba8-81e9-47ed-90ce-4a1f2b235af6/42672585.jpg', 'description' => 'Resolve temperature regulation and heating problems.'],
                ];

                // loop for creating a card for each appliance
                foreach ($appliances as $appliance) {
                    echo '
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="' . $appliance['image'] . '" class="card-img-top" alt="' . $appliance['name'] . '">
                            <div class="card-body">
                                <h5 class="card-title">' . $appliance['name'] . '</h5>
                                <p class="card-text">' . $appliance['description'] . '</p>
                            </div>
                        </div>
                    </div>';
                }
                ?>
            </div>
        </div>
    </section>

    <?php include('../common/footer.php'); ?>

    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="https://cdn.reflowhq.com/v2/toolkit.min.js"></script>
    <script src="assets/js/bs-init.js"></script>
    <script src="assets/js/startup-modern.js"></script>
</body>

</html>