<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Password Recovery - Applicare</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.reflowhq.com/v2/toolkit.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&amp;display=swap">
    <link rel="stylesheet" href="assets/css/bs-theme-overrides.css">
    <link rel="stylesheet" href="assets/css/Login-Form-Basic-icons.css">
</head>

<body>
    <?php include('../common/header.php'); ?>

    <section class="py-5 mt-5">
        <div class="container py-4 py-xl-5">
            <section class="position-relative py-4 py-xl-5">
                <div class="container">
                    <div class="row mb-5">
                        <div class="col-md-8 col-xl-6 text-center mx-auto">
                            <h2>Password Recovery</h2>
                            <p class="w-lg-50">Enter your email address to reset your password.</p>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center" style="--bs-primary: #24285b; --bs-primary-rgb: 36,40,91;color: #24285b;border-color: #24285b;">
                        <div class="col-md-6 col-xl-4">
                            <div class="card mb-5">
                                <div class="card-body d-flex flex-column align-items-center">
                                    <div class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-lock">
                                            <path d="M8 0a4 4 0 0 0-4 4v4H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V4a4 4 0 0 0-4-4zM4 4a3 3 0 1 1 6 0v4H4V4z"></path>
                                        </svg>
                                    </div>
                                    <!-- Password Recovery Form -->
                                    <form class="text-center" method="post">
                                        <div class="mb-3">
                                            <input class="form-control" type="email" name="email" placeholder="Enter your email" required>
                                        </div>
                                        <div class="mb-3">
                                            <button class="btn btn-primary d-block w-100" type="submit">Send Recovery Email</button>
                                        </div>
                                    </form>
                                    <p class="text-muted">Remembered your password?</p>
                                    <a class="btn btn-link d-block w-100" href="login.php" style="color: #24285b; text-decoration: none;">Back to Login</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </section>

    <?php include('../common/footer.php'); ?>

    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="https://cdn.reflowhq.com/v2/toolkit.min.js"></script>
    <script src="assets/js/bs-init.js"></script>
    <script src="assets/js/startup-modern.js"></script>
</body>

</html>
