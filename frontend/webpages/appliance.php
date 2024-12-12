<?php
// Connect to the database
include('../src/database-applicare.php');

// Retrieve the appliance ID from the query string
$applianceId = isset($_GET['id']) ? (int) $_GET['id'] : 0;

// Fetch appliance details
$applianceQuery = $db->prepare("SELECT * FROM appliances WHERE id = ?");
$applianceQuery->execute([$applianceId]);
$appliance = $applianceQuery->fetch();

// Fetch all brands for the selected appliance
$brandsQuery = $db->prepare("SELECT id, name FROM brands WHERE appliance_id = ?");
$brandsQuery->execute([$applianceId]);
$brands = $brandsQuery->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Applicare - Choose Brand and Model</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:300,400,600,700&amp;display=swap">
    <link rel="stylesheet" href="assets/css/bs-theme-overrides.css">
    <script src="assets/js/jquery.min.js"></script>
</head>

<body>
    <?php include('../common/header.php'); ?>

    <header class="pt-5">
        <div class="container pt-4 pt-xl-5">
            <div class="row pt-5">
                <div class="col-md-8 text-center text-md-start mx-auto">
                    <h1 class="display-4 fw-bold mb-5">
                        Choose Brand and Model for <?php echo htmlspecialchars($appliance['name'] ?? 'Unknown Appliance'); ?>
                    </h1>
                </div>
            </div>
        </div>
    </header>

    <section class="models-section py-5">
        <div class="container">
            <!-- Brand Selection -->
            <div class="mb-4">
                <label for="brandSelect" class="form-label">Select Brand</label>
                <select class="form-select" id="brandSelect" aria-label="Select Brand">
                    <option selected disabled>Select a Brand</option>
                    <?php foreach ($brands as $brand): ?>
                        <option value="<?php echo $brand['id']; ?>"><?php echo htmlspecialchars($brand['name']); ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <!-- Model Selection -->
            <div class="mb-4">
                <label for="modelSelect" class="form-label">Select Model</label>
                <select class="form-select" id="modelSelect" aria-label="Select Model" disabled>
                    <option selected disabled>Select a Model</option>
                </select>
            </div>

            <!-- Troubleshoot Button -->
            <div id="troubleshootButton" class="mb-4" style="display:none;">
                <a href="#" class="btn btn-primary">Troubleshoot</a>
            </div>
        </div>
    </section>

    <?php include('../common/footer.php'); ?>

    <script src="assets/bootstrap/js/bootstrap.min.js"></script>

    <script>
        // Fetch models when brand is selected
        $('#brandSelect').on('change', function() {
            var brandId = $(this).val();
            
            // Clear and disable model select dropdown
            $('#modelSelect').prop('disabled', true).html('<option selected disabled>Loading models...</option>');

            // Make AJAX request to fetch models for the selected brand
            $.ajax({
                url: 'get_models.php',
                type: 'GET',
                data: { brand_id: brandId },
                success: function(response) {
                    var models = JSON.parse(response);
                    
                    // Populate the model dropdown with the response
                    if (models.length > 0) {
                        var modelOptions = '<option selected disabled>Select a Model</option>';
                        models.forEach(function(model) {
                            modelOptions += '<option value="' + model.id + '">' + model.name + '</option>';
                        });
                        $('#modelSelect').prop('disabled', false).html(modelOptions);
                    } else {
                        $('#modelSelect').prop('disabled', true).html('<option selected disabled>No models found</option>');
                    }
                }
            });
        });

        // Show the troubleshoot button once a model is selected
        $('#modelSelect').on('change', function() {
            var modelId = $(this).val();
            if (modelId) {
                $('#troubleshootButton').show();
                $('#troubleshootButton a').attr('href', 'troubleshoot.php?model_id=' + modelId);
            } else {
                $('#troubleshootButton').hide();
            }
        });
    </script>

</body>

</html>
