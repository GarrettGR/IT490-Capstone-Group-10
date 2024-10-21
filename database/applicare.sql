-- Appliance Troubleshooting Website SQL Dump
-- version 1.1
-- https://www.appliancetroubleshoot.com/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 21, 2024 at 12:00 PM
-- Server version: 10.11.5-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appliance_troubleshooting`
--

-- --------------------------------------------------------

-- Create 'appliances' table
CREATE TABLE appliances (
    appliance_id INT AUTO_INCREMENT PRIMARY KEY,
    appliance_name VARCHAR(255) NOT NULL,
    model_number VARCHAR(100),
    brand VARCHAR(100),
    purchase_date DATE,
    warranty_expiration DATE
);

-- Create 'parts' table
CREATE TABLE parts (
    part_id INT AUTO_INCREMENT PRIMARY KEY,
    part_name VARCHAR(255) NOT NULL,
    appliance_id INT,
    part_number VARCHAR(100),
    price DECIMAL(10, 2),
    FOREIGN KEY (appliance_id) REFERENCES appliances(appliance_id)
);

-- Create 'repair_services' table
CREATE TABLE repair_services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    service_cost DECIMAL(10, 2),
    service_location VARCHAR(255),
    contact_number VARCHAR(15)
);

-- Create 'troubleshooting_guides' table
CREATE TABLE troubleshooting_guides (
    guide_id INT AUTO_INCREMENT PRIMARY KEY,
    appliance_id INT,
    issue_description TEXT NOT NULL,
    solution_description TEXT,
    FOREIGN KEY (appliance_id) REFERENCES appliances(appliance_id)
);

-- Create 'user_troubleshooting_logs' table
CREATE TABLE user_troubleshooting_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    guide_id INT,
    troubleshooting_date DATETIME,
    issue_resolved BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (guide_id) REFERENCES troubleshooting_guides(guide_id)
);

-- Create 'users' table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------

--
-- Dumping data for `users`, `appliances`, `parts`, `repair_services`, `troubleshooting_guides`, `user_troubleshooting_logs`
--

-- Sample data for `users`
INSERT INTO `users` (`user_id`, `username`, `email`, `password_hash`, `created_at`) VALUES
(1, 'Jane Doe', 'jane.doe@example.com', '$2y$10$W6H0E8OC9DhiBvQIVyjd8ObdOd1WpC5t2uB7EQBl9O5FZJ5GKv6n2', '2024-10-21 12:00:00'),
(2, 'John Smith', 'john.smith@example.com', '$2y$10$gDFBMSXs6vG0q5JYd23RfOCklXlCfPcPU9V02TpUZ5aShLBJdsU5C', '2024-10-21 12:01:00');

-- Sample data for `appliances`
INSERT INTO `appliances` (`appliance_id`, `appliance_name`, `model_number`, `brand`, `purchase_date`, `warranty_expiration`) VALUES
(1, 'Washing Machine', 'WM2022', 'Whirlpool', '2022-06-15', '2024-06-15'),
(2, 'Refrigerator', 'FR1234', 'Samsung', '2021-08-10', '2023-08-10');

-- Sample data for `parts`
INSERT INTO `parts` (`part_id`, `part_name`, `appliance_id`, `part_number`, `price`) VALUES
(1, 'Water Pump', 1, 'WP345', 45.99),
(2, 'Cooling Fan', 2, 'CF789', 29.99);

-- Sample data for `repair_services`
INSERT INTO `repair_services` (`service_id`, `service_name`, `service_cost`, `service_location`, `contact_number`) VALUES
(1, 'Whirlpool Authorized Repair', 120.00, '123 Main St, Cityville', '123-456-7890'),
(2, 'Samsung Repair Experts', 150.00, '456 Elm St, Townsville', '987-654-3210');

-- Sample data for `troubleshooting_guides`
INSERT INTO `troubleshooting_guides` (`guide_id`, `appliance_id`, `issue_description`, `solution_description`) VALUES
(1, 1, 'Washing machine not draining', 'Check and replace the water pump'),
(2, 2, 'Refrigerator making noise', 'Inspect and clean the cooling fan');

-- Sample data for `user_troubleshooting_logs`
INSERT INTO `user_troubleshooting_logs` (`log_id`, `user_id`, `guide_id`, `troubleshooting_date`, `issue_resolved`) VALUES
(1, 1, 1, '2024-10-21 12:15:00', 1),
(2, 2, 2, '2024-10-21 12:20:00', 0);

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
