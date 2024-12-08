<?php
// checks database connection cause it is needed for signing up to add the user to the user table
include('../src/database-applicare.php'); 

?>

<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Pricing - Brand</title>
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
                            <h2>Sign Up</h2>
                            <p class="w-lg-50">Create an Account</p>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-8 col-xl-6">
                            <div class="card mb-5">
                                <div class="card-body d-flex flex-column align-items-center">
                                    <div class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-person">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                                        </svg></div>
                                    <p>Sign Up</p>
                                    <form class="text-center" method="post">
                                        <div class="mb-3">
                                            <label for="name" class="form-label text-start w-100">Name</label>
                                            <input id="name" class="form-control" type="text" name="name" placeholder="John Doe">
                                        </div>
                                        <div class="mb-3">
                                            <label for="email" class="form-label text-start w-100">Email</label>
                                            <input id="email" class="form-control" type="text" name="email" placeholder="johndoe@gmail.com">
                                        </div>
                                        <div class="mb-3">
                                            <label for="password" class="form-label text-start w-100">Password</label>
                                            <input id="password" class="form-control" type="text" name="password" placeholder="Password123!">
                                        </div>
                                        <div class="mb-3">
                                            <label for="security-question" class="form-label text-start w-100">Select a Security Question</label>
                                            <div class="dropdown">
                                                <button id="security-question" class="btn btn-primary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: rgb(0,0,0);background: rgb(255,255,255);">
                                                    Choose a Question
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">What year was your father born?</a></li>
                                                    <li><a class="dropdown-item" href="#">What is your favorite color?</a></li>
                                                    <li><a class="dropdown-item" href="#">What is the name of your first pet?</a></li>
                                                    <li><a class="dropdown-item" href="#">What elementary school did you attend?</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="security-answer" class="form-label text-start w-100">Answer</label>
                                            <input id="security-answer" class="form-control" type="text" name="security_answer_1" placeholder="Blue">
                                        </div>
                                        <div class="mb-3">
                                            <a class="btn btn-primary d-block w-100" role="button" href="login.php">Sign Up</a>
                                        </div>
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
</body>

</html>