<html lang="en">
  <head>
    <!-- Add Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <!-- Brand Name/Logo -->
        <a class="navbar-brand" href="/">Applicare</a>

        <!-- Navbar Toggler for Smaller Screens (Hamburger) -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Links (Center-aligned) -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto"> <!-- mx-auto centers the navbar items -->
            <li class="nav-item">
              <a class="nav-link" href="index.php">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="about-us.php">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="our-services.php">Our Services</a>
            </li>
          </ul>

          <!-- Right-aligned Section (Sign In, Star Icon, Cart) -->
          <ul class="navbar-nav ms-auto"> <!-- ms-auto pushes the items to the right -->
            <li class="nav-item">
              <a class="btn btn-primary" href="login.php" role="button">Sign In</a>
            </li>
            <li class="nav-item">
              <a href="saved.php" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-star" style="width: 21px; height: 20px;">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                </svg>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">Cart</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Add Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
