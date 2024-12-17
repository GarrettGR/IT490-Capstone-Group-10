CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  security_question_1 varchar(255) NOT NULL,
  security_answer_1 varchar(255) NOT NULL,
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
);

CREATE TABLE appliances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255) NOT NULL,  -- washer, dryer, etc.
  brand VARCHAR(255) NOT NULL,  -- whirlpool, samsung, etc.
  model VARCHAR(255) NOT NULL,  -- model number
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY (brand, model),
  INDEX (type),
  INDEX (brand)
);

CREATE TABLE parts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  appliance_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,    -- bearing, belt, motor, etc.
  area VARCHAR(255) NOT NULL, --  door, controls, cooling system, etc.
  description TEXT,
  image_url VARCHAR(255),
  purchase_url VARCHAR(255),
  video_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (appliance_id) REFERENCES appliances(id),
  INDEX (type),
  INDEX (area)
);

CREATE TABLE common_problems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  appliance_id INT NOT NULL,
  part_id INT NOT NULL,
  problem_description TEXT NOT NULL,
  solution_steps TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (appliance_id) REFERENCES appliances(id),
  FOREIGN KEY (part_id) REFERENCES parts(id)
);

CREATE TABLE part_reviews (
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
  UNIQUE KEY (user_id, part_id, problem_id) -- one review per user per part per problem
);

CREATE TABLE saved_parts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  part_id INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (part_id) REFERENCES parts(id),
  UNIQUE KEY (user_id, part_id) -- prevent duplicate saves (regardless of notes)
);

CREATE INDEX idx_part_reviews_ratings ON part_reviews(part_id, rating);
CREATE INDEX idx_saved_parts_user ON saved_parts(user_id, created_at);
