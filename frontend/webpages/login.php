<?php
// Include database connection
include('../src/database-applicare.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);

    if (empty($email)) {
        echo "Email is required!";
    } else {
        try {
            // Check if the user exists
            $sql = "SELECT id FROM users WHERE email = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                // Generate a unique token
                $token = bin2hex(random_bytes(32));
                $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

                // Save the token to the database
                $insertToken = "INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)";
                $stmt = $db->prepare($insertToken);
                $stmt->execute([$email, $token, $expires]);

                // Send the reset link via email
                $resetLink = "http://yourwebsite.com/reset_password.php?token=$token";
                $subject = "Password Reset Request";
                $message = "Click the link below to reset your password:\n\n$resetLink";
                $headers = "From: no-reply@yourwebsite.com";

                if (mail($email, $subject, $message, $headers)) {
                    echo "Password reset link has been sent to your email!";
                } else {
                    echo "Failed to send email. Please try again.";
                }
            } else {
                echo "No user found with that email address.";
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
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

    <section class="py-5 mt-5">
        <div class="container py-4 py-xl-5">
            <section class="position-relative py-4 py-xl-5">
                <div class="container">
                    <div class="row mb-5">
                        <div class="col-md-8 col-xl-6 text-center mx-auto">
                            <h2>Log in</h2>
                            <p class="w-lg-50">Weclome to Applicare.</p>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center" style="--bs-primary: #24285b;--bs-primary-rgb: 36,40,91;color: #24285b;border-color: #24285b;">
                        <div class="col-md-6 col-xl-4">
                            <div class="card mb-5">
                                <div class="card-body d-flex flex-column align-items-center">
                                    <div class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-person">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                                        </svg></div>
                                    <form class="text-center" method="post">
                                        <div class="mb-3"><input class="form-control" type="email" name="email" placeholder="Email"></div>
                                        <div class="mb-3"><input class="form-control" type="password" name="password" placeholder="Password"></div>
                                        <div class="mb-3"><button class="btn btn-primary d-block w-100" type="submit">Login</button></div>
                                        <a href="password-recovery.php">Forgot your password?</a>
                                        <p class="text-muted">Don't have an account?</p>
                                        <a class="btn btn-primary d-block w-100" role="button" href="signup.php" style="color: rgb(0,0,0);background: rgb(255,255,255);">Create an Account</a>
                                    </form>
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

    <script>
        // Display alert if there's an error
        <?php if (!empty($error)) : ?>
            alert("<?php echo $error; ?>");
        <?php endif; ?>
    </script>
</body>

</html>