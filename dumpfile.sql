/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.4.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: applicare
-- ------------------------------------------------------
-- Server version	11.4.3-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `appliances`
--

DROP TABLE IF EXISTS `appliances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appliances` (
  `appliance_id` int(11) NOT NULL AUTO_INCREMENT,
  `appliance_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`appliance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appliances`
--

LOCK TABLES `appliances` WRITE;
/*!40000 ALTER TABLE `appliances` DISABLE KEYS */;
INSERT INTO `appliances` VALUES
(3,'Washers','Troubleshoot issues with washing performance, leaks, and spinning.'),
(6,'Dryers','Resolve heating, tumbling, and drying problems.'),
(9,'Refrigerators','Fix cooling, temperature regulation, and ice maker issues.'),
(12,'Dishwashers','Get help with drainage, cleaning, and drying cycles.'),
(15,'Microwaves','Troubleshoot heating, power, and display issues.'),
(18,'Ovens','Resolve temperature regulation and heating problems.');
/*!40000 ALTER TABLE `appliances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL AUTO_INCREMENT,
  `appliance_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`brand_id`),
  KEY `appliance_id` (`appliance_id`),
  CONSTRAINT `brands_ibfk_1` FOREIGN KEY (`appliance_id`) REFERENCES `appliances` (`appliance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES
(1,3,'Whirlpool'),
(2,3,'LG'),
(3,6,'Samsung'),
(4,6,'GE'),
(5,9,'Frigidaire'),
(6,9,'Maytag'),
(7,12,'Bosch'),
(8,12,'KitchenAid'),
(9,15,'Panasonic'),
(10,15,'Sharp'),
(11,18,'Viking'),
(12,18,'Thermador');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue_types`
--

DROP TABLE IF EXISTS `issue_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `issue_types` (
  `issue_id` int(11) NOT NULL AUTO_INCREMENT,
  `area_id` int(11) NOT NULL,
  `issue_description` text NOT NULL,
  PRIMARY KEY (`issue_id`),
  KEY `area_id` (`area_id`),
  CONSTRAINT `issue_types_ibfk_1` FOREIGN KEY (`area_id`) REFERENCES `problem_areas` (`area_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_types`
--

LOCK TABLES `issue_types` WRITE;
/*!40000 ALTER TABLE `issue_types` DISABLE KEYS */;
INSERT INTO `issue_types` VALUES
(3,3,'Door seal is leaking'),
(6,3,'Door seal is cracked or damaged'),
(9,60,'Door seal is not properly aligned'),
(12,60,'Door seal is worn out and needs replacement'),
(15,6,'Drum is not spinning correctly'),
(18,6,'Drum is making excessive noise'),
(21,6,'Drum is off balance during cycles'),
(24,9,'Hose is leaking water'),
(27,9,'Hose is clogged or blocked'),
(30,9,'Hose is disconnected or loose'),
(33,12,'Control panel buttons are unresponsive'),
(36,12,'Control panel is displaying error codes'),
(39,48,'Control panel lights are not working'),
(42,48,'Control panel wiring is faulty'),
(45,15,'Heating element is not producing heat'),
(48,15,'Heating element is overheating'),
(51,51,'Heating element has a burnt-out coil'),
(54,51,'Heating element is causing circuit trips'),
(57,18,'Lint trap is clogged with debris'),
(60,18,'Lint trap is not sealing properly'),
(63,18,'Lint trap is damaged or needs cleaning'),
(66,21,'Drum motor is not functioning'),
(69,21,'Drum motor is making loud noises'),
(72,30,'Drum motor has electrical faults'),
(75,30,'Drum motor is overheating during use'),
(78,24,'Compressor is not cooling effectively'),
(81,24,'Compressor is making a loud buzzing noise'),
(84,24,'Compressor is leaking refrigerant'),
(87,27,'Evaporator is freezing over'),
(90,27,'Evaporator fan is not working'),
(93,27,'Evaporator coils are damaged'),
(96,33,'Spray arms are clogged with debris'),
(99,33,'Spray arms are not rotating properly'),
(102,33,'Spray arms are damaged or cracked'),
(105,36,'Filter is clogged with debris'),
(108,36,'Filter is not sealing properly'),
(111,36,'Filter needs replacement'),
(114,39,'Door gasket is leaking'),
(117,39,'Door gasket is worn out'),
(120,39,'Door gasket is not sealing correctly'),
(123,42,'Magnetron is not heating food'),
(126,42,'Magnetron is making loud buzzing noises'),
(129,42,'Magnetron has a short circuit'),
(132,45,'Turntable is not spinning'),
(135,45,'Turntable motor is not working'),
(138,45,'Turntable glass is cracked'),
(141,57,'Thermostat is not regulating temperature'),
(144,57,'Thermostat is malfunctioning'),
(147,57,'Thermostat wiring is faulty');
/*!40000 ALTER TABLE `issue_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issues_parts`
--

DROP TABLE IF EXISTS `issues_parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `issues_parts` (
  `issue_id` int(11) NOT NULL,
  `part_id` int(11) NOT NULL,
  KEY `issue_id` (`issue_id`),
  KEY `part_id` (`part_id`),
  CONSTRAINT `issues_parts_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issue_types` (`issue_id`),
  CONSTRAINT `issues_parts_ibfk_2` FOREIGN KEY (`part_id`) REFERENCES `parts` (`part_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issues_parts`
--

LOCK TABLES `issues_parts` WRITE;
/*!40000 ALTER TABLE `issues_parts` DISABLE KEYS */;
INSERT INTO `issues_parts` VALUES
(3,1),
(6,1),
(9,4),
(12,4),
(15,7),
(18,7),
(21,7),
(24,10),
(27,10),
(30,10),
(33,13),
(36,13),
(39,13),
(42,13),
(45,16),
(48,16),
(51,16),
(54,16),
(57,13),
(60,13),
(63,13),
(66,16),
(69,16),
(72,16),
(75,16),
(78,10),
(81,10),
(84,10),
(87,13),
(90,13),
(93,13),
(96,13),
(99,13),
(102,13),
(105,16),
(108,16),
(111,16),
(114,16),
(117,16),
(120,16),
(123,16),
(126,16),
(129,16),
(132,16),
(135,16),
(138,16),
(141,16),
(144,16),
(147,16);
/*!40000 ALTER TABLE `issues_parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) DEFAULT 0,
  `date_added` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `models`
--

DROP TABLE IF EXISTS `models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `models` (
  `model_id` int(11) NOT NULL AUTO_INCREMENT,
  `brand_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`model_id`),
  KEY `brand_id` (`brand_id`),
  CONSTRAINT `models_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `models`
--

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` VALUES
(1,1,'WTW5000DW'),
(2,1,'WFW5620HW'),
(3,2,'WM3900HWA'),
(4,2,'WT7800CW'),
(5,3,'DV45H6300'),
(6,3,'DVE60M9900'),
(7,4,'GFD55ESSNWW'),
(8,4,'GTD33EASKWW'),
(9,5,'FGHB2868TF'),
(10,5,'FRFS2823AW'),
(11,6,'MFI2570FEZ'),
(12,6,'MRT311FFFZ'),
(13,7,'SHEM63W55N'),
(14,7,'SHXM78Z55N'),
(15,8,'KDFE104HPS'),
(16,8,'KDTE334GPS'),
(17,9,'NN-SN966S'),
(18,9,'NN-CD87KS'),
(19,10,'SMC1585BB'),
(20,10,'SMC2242DS'),
(21,11,'VDOF730SS'),
(22,11,'VESO1302SS'),
(23,12,'MED301RWS'),
(24,12,'POD301W');
/*!40000 ALTER TABLE `models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parts`
--

DROP TABLE IF EXISTS `parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parts` (
  `part_id` int(11) NOT NULL AUTO_INCREMENT,
  `part_name` varchar(255) NOT NULL,
  `part_image` varchar(255) DEFAULT NULL,
  `part_link` varchar(255) DEFAULT NULL,
  `instructions_video` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`part_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parts`
--

LOCK TABLES `parts` WRITE;
/*!40000 ALTER TABLE `parts` DISABLE KEYS */;
INSERT INTO `parts` VALUES
(1,'Drum Belt','https://example.com/drum_belt.jpg','https://example.com/drum_belt','https://example.com/drum_belt_video'),
(4,'Heating Element','https://example.com/heating_element.jpg','https://example.com/heating_element','https://example.com/heating_element_video'),
(7,'Control Board','https://example.com/control_board.jpg','https://example.com/control_board','https://example.com/control_board_video'),
(10,'Compressor','https://example.com/compressor.jpg','https://example.com/compressor','https://example.com/compressor_video'),
(13,'Spray Arms','https://example.com/spray_arms.jpg','https://example.com/spray_arms','https://example.com/spray_arms_video'),
(16,'Magnetron','https://example.com/magnetron.jpg','https://example.com/magnetron','https://example.com/magnetron_video');
/*!40000 ALTER TABLE `parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem_areas`
--

DROP TABLE IF EXISTS `problem_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `problem_areas` (
  `area_id` int(11) NOT NULL AUTO_INCREMENT,
  `appliance_id` int(11) NOT NULL,
  `area_name` varchar(255) NOT NULL,
  PRIMARY KEY (`area_id`),
  KEY `appliance_id` (`appliance_id`),
  CONSTRAINT `problem_areas_ibfk_1` FOREIGN KEY (`appliance_id`) REFERENCES `appliances` (`appliance_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_areas`
--

LOCK TABLES `problem_areas` WRITE;
/*!40000 ALTER TABLE `problem_areas` DISABLE KEYS */;
INSERT INTO `problem_areas` VALUES
(3,18,'Door Seal'),
(6,3,'Drum'),
(9,3,'Hose'),
(12,3,'Control Panel'),
(15,6,'Heating Element'),
(18,6,'Lint Trap'),
(21,6,'Drum Motor'),
(24,9,'Compressor'),
(27,9,'Evaporator'),
(30,9,'Drum Motor'),
(33,12,'Spray Arms'),
(36,12,'Filter'),
(39,12,'Door Gaskeet'),
(42,15,'Magnetron'),
(45,15,'Turntable'),
(48,15,'Control Panel'),
(51,18,'Heating Element'),
(57,18,'Thermostat'),
(60,18,'Door Seal');
/*!40000 ALTER TABLE `problem_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `security_question_1` varchar(255) NOT NULL,
  `security_answer_1` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(2,'John','Doe','johndoe@example.com','Password123!','What is your favority color?','Blue','2024-12-12 05:24:30','2024-12-12 05:24:30');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-12-17  3:24:15
