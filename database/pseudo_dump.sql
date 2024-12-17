-- MariaDB dump 10.19-11.4.3-MariaDB, for debian-linux-gnu (x86_64)

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Table structure for table `appliances`
--

DROP TABLE IF EXISTS `appliances`;
CREATE TABLE `appliances` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (brand, model),
    INDEX (type),
    INDEX (brand)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `appliances`
--

LOCK TABLES `appliances` WRITE;
INSERT INTO `appliances` VALUES
(1, 'Washer', 'Whirlpool', 'WTW5000DW', 'Top-loading washer with advanced cleaning technology', '2024-12-17 03:24:15'),
(2, 'Washer', 'Whirlpool', 'WFW5620HW', 'Front-loading washer with steam feature', '2024-12-17 03:24:15'),
(3, 'Washer', 'LG', 'WM3900HWA', 'Smart front-loading washer with TurboWash', '2024-12-17 03:24:15'),
(4, 'Washer', 'LG', 'WT7800CW', 'Top-loading washer with TurboWash3D', '2024-12-17 03:24:15'),
(5, 'Dryer', 'Samsung', 'DV45H6300', 'Electric dryer with steam sanitize+', '2024-12-17 03:24:15'),
(6, 'Dryer', 'Samsung', 'DVE60M9900', 'Smart electric dryer with FlexDry', '2024-12-17 03:24:15'),
(7, 'Dryer', 'GE', 'GFD55ESSNWW', 'Electric dryer with sanitize cycle', '2024-12-17 03:24:15'),
(8, 'Refrigerator', 'Frigidaire', 'FGHB2868TF', 'French door refrigerator with ice maker', '2024-12-17 03:24:15'),
(9, 'Refrigerator', 'Maytag', 'MFI2570FEZ', 'French door refrigerator with PowerCold', '2024-12-17 03:24:15');

UNLOCK TABLES;

--
-- Table structure for table `parts`
--

DROP TABLE IF EXISTS `parts`;
CREATE TABLE `parts` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appliance_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    purchase_url VARCHAR(255),
    video_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appliance_id) REFERENCES appliances(id),
    INDEX (type),
    INDEX (area)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `parts`
--

LOCK TABLES `parts` WRITE;
INSERT INTO `parts` VALUES
(1, 1, 'Drive Belt Assembly', 'belt', 'drum', 'Main drive belt for drum operation', 'https://example.com/drum_belt.jpg', 'https://example.com/drum_belt', 'https://example.com/drum_belt_video', '2024-12-17 03:24:15'),
(2, 1, 'Control Board', 'board', 'control', 'Main control board for washer operation', 'https://example.com/control_board.jpg', 'https://example.com/control_board', 'https://example.com/control_board_video', '2024-12-17 03:24:15'),
(3, 5, 'Heating Element', 'heater', 'heating', 'Main heating element for dryer', 'https://example.com/heating_element.jpg', 'https://example.com/heating_element', 'https://example.com/heating_element_video', '2024-12-17 03:24:15'),
(4, 8, 'Compressor Assembly', 'compressor', 'cooling', 'Main compressor for refrigeration', 'https://example.com/compressor.jpg', 'https://example.com/compressor', 'https://example.com/compressor_video', '2024-12-17 03:24:15');

UNLOCK TABLES;

--
-- Table structure for table `common_problems`
--

DROP TABLE IF EXISTS `common_problems`;
CREATE TABLE `common_problems` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appliance_id INT NOT NULL,
    part_id INT NOT NULL,
    problem_description TEXT NOT NULL,
    solution_steps TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appliance_id) REFERENCES appliances(id),
    FOREIGN KEY (part_id) REFERENCES parts(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `common_problems`
--

LOCK TABLES `common_problems` WRITE;
INSERT INTO `common_problems` VALUES
(1, 1, 1, 'Drum is not spinning correctly', 'Check belt tension and alignment. Replace if worn or damaged.', '2024-12-17 03:24:15'),
(2, 1, 1, 'Drum is making excessive noise', 'Inspect belt for wear and proper routing. Replace if damaged.', '2024-12-17 03:24:15'),
(3, 1, 2, 'Control panel is unresponsive', 'Check electrical connections. Replace control board if diagnostic tests fail.', '2024-12-17 03:24:15'),
(4, 5, 3, 'Dryer not heating', 'Test heating element continuity. Replace if no continuity detected.', '2024-12-17 03:24:15'),
(5, 8, 4, 'Refrigerator not cooling', 'Check compressor operation and refrigerant levels. Replace if faulty.', '2024-12-17 03:24:15');

UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    failed_login_attempts INT DEFAULT 0,
    last_login_at TIMESTAMP NULL,
    password_reset_token VARCHAR(255) NULL,
    password_reset_expires TIMESTAMP NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (email_verification_token),
    INDEX (password_reset_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES
(1, 'johndoe@example.com', 'Password123!', 'John', 'Doe', true, 0, '2024-12-17 03:24:15', NULL, NULL, true, NULL, '2024-12-17 03:24:15', '2024-12-17 03:24:15'),
(2, 'jane.smith@example.com', 'SecurePass456!', 'Jane', 'Smith', true, 0, '2024-12-17 03:24:15', NULL, NULL, true, NULL, '2024-12-17 03:24:15', '2024-12-17 03:24:15');

UNLOCK TABLES;

--
-- Table structure for table `part_reviews`
--

DROP TABLE IF EXISTS `part_reviews`;
CREATE TABLE `part_reviews` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    part_id INT NOT NULL,
    problem_id INT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    fixed_issue BOOLEAN NOT NULL,
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (part_id) REFERENCES parts(id),
    FOREIGN KEY (problem_id) REFERENCES common_problems(id),
    UNIQUE KEY (user_id, part_id, problem_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `part_reviews`
--

LOCK TABLES `part_reviews` WRITE;
INSERT INTO `part_reviews` VALUES
(1, 1, 1, 1, 5, true, 'Perfect fit, solved the spinning problem completely', '2024-12-17 03:24:15', '2024-12-17 03:24:15'),
(2, 2, 3, 4, 4, true, 'Fixed the heating issue but installation was tricky', '2024-12-17 03:24:15', '2024-12-17 03:24:15');

UNLOCK TABLES;

--
-- Table structure for table `saved_parts`
--

DROP TABLE IF EXISTS `saved_parts`;
CREATE TABLE `saved_parts` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    part_id INT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (part_id) REFERENCES parts(id),
    UNIQUE KEY (user_id, part_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `saved_parts`
--

LOCK TABLES `saved_parts` WRITE;
INSERT INTO `saved_parts` VALUES
(1, 1, 2, 'Need to buy this next month for the washer repair', '2024-12-17 03:24:15'),
(2, 2, 4, 'Compare price with local repair shop', '2024-12-17 03:24:15');

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Dump completed on 2024-12-17  3:24:15
