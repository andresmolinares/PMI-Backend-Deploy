CREATE TABLE `institutions` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `law_violations` (
	`id` int NOT NULL AUTO_INCREMENT,
	`sentence_months` varchar(15) NOT NULL,
	`admission_date` date NOT NULL,
	`recidivist` tinyint NOT NULL,
	`recidivism_quantity` int NOT NULL,
	`patients_id` int NOT NULL,
	PRIMARY KEY (`id`),
	KEY `fk_law_violations_patients` (`patients_id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

CREATE TABLE `parameter_types` (
	`id` int NOT NULL AUTO_INCREMENT,
	`description` varchar(50) NOT NULL,
	`deleted_at` datetime,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

CREATE TABLE `parameters` (
	`id` int NOT NULL AUTO_INCREMENT,
	`description` varchar(50),
	`code` varchar(45),
	`parameter_types_id` int NOT NULL,
	PRIMARY KEY (`id`),
	KEY `fk_parameters_parameter_types1_idx` (`parameter_types_id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

CREATE TABLE `patients` (
	`id` int NOT NULL AUTO_INCREMENT,
	`code` varchar(20) NOT NULL,
	`subject` enum('infractor', 'no infractor', 'no registra') NOT NULL DEFAULT 'no registra',
	`first_name` varchar(50),
	`first_surname` varchar(50),
	`second_surname` varchar(50),
	`gender` enum('masculino', 'femenino', 'otro', 'no registra') NOT NULL DEFAULT 'no registra',
	`birth_date` date NOT NULL,
	`birth_department` varchar(50),
	`birth_city` varchar(50),
	`study_years` int NOT NULL,
	`marital_status` enum('soltero', 'casado', 'divorciado', 'viudo', 'no registra') DEFAULT 'no registra',
	`orthodontic_appliance` enum('si', 'no', 'no registra') DEFAULT 'no registra',
	`schooling_level` enum('Agrafo', 'Preescolar', 'Básica Primaria', 'Básica Secundaria', 'Media', 'Técnico', 'Universitario', 'Postgrado', 'no registra') NOT NULL DEFAULT 'no registra',
	`family_type` enum('Familia nuclear', 'Familia extensa', 'Familia monoparental madre', 'Familia monoparental padre', 'Familia reconstituida', 'Familia de padres separados', 'Familia homoparental', 'De cuidador/es', 'no registra') DEFAULT 'no registra',
	`socioeconomic_status` enum('Nivel 1', 'Nivel 2', 'Nivel 3', 'Nivel 4', 'Nivel 5', 'Nivel 6', 'no registra') NOT NULL DEFAULT 'no registra',
	`created_at` datetime DEFAULT current_timestamp(),
	`updated_at` datetime,
	`deleted_at` datetime,
	`users_id` int NOT NULL,
	`institutions_id` int NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `code_UNIQUE` (`code`),
	KEY `fk_patients_users_idx` (`users_id`),
	KEY `fk_patients_institutions_id` (`institutions_id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

CREATE TABLE `patients_has_parameters` (
	`patients_id` int NOT NULL,
	`parameters_id` int NOT NULL,
	PRIMARY KEY (`patients_id`, `parameters_id`),
	KEY `fk_patients_has_parameters_parameters1_idx` (`parameters_id`),
	KEY `fk_patients_has_parameters_patients1_idx` (`patients_id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

CREATE TABLE `psychological_processes` (
	`id` int NOT NULL AUTO_INCREMENT,
	`description` varchar(45) NOT NULL,
	`max_points` varchar(45) NOT NULL,
	`instruction` text NOT NULL,
	`psychological_tests_id` int NOT NULL,
	PRIMARY KEY (`id`),
	KEY `fk_psychological_processes_psychological_tests_idx` (`psychological_tests_id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

CREATE TABLE `psychological_results` (
	`score` double NOT NULL,
	`created_at` datetime NOT NULL DEFAULT current_timestamp(),
	`patients_id` int NOT NULL,
	`psychological_tasks_id` int NOT NULL,
	KEY `fk_psychological_results_patients1_idx` (`patients_id`),
	KEY `fk_psychological_results_psychological_tasks1_idx` (`psychological_tasks_id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

CREATE TABLE `psychological_tasks` (
	`id` int NOT NULL AUTO_INCREMENT,
	`description` varchar(50) NOT NULL,
	`max_score` double NOT NULL,
	`min_score` double NOT NULL,
	`psychological_processes_id` int NOT NULL,
	PRIMARY KEY (`id`),
	KEY `fk_psychological_tasks_psychological_processes_idx` (`psychological_processes_id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

CREATE TABLE `psychological_tests` (
	`id` int NOT NULL AUTO_INCREMENT,
	`description` varchar(50) NOT NULL,
	`short_description` varchar(20) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

CREATE TABLE `supplemental_data` (
	`id` int NOT NULL AUTO_INCREMENT,
	`children` tinyint NOT NULL,
	`children_quantity` int NOT NULL DEFAULT '0',
	`sibling` tinyint NOT NULL,
	`sibling_quantity` int NOT NULL DEFAULT '0',
	`sibling_disciplinary_record` tinyint NOT NULL,
	`sibling_spa_use` tinyint NOT NULL,
	`gangster` tinyint NOT NULL,
	`spa_use` tinyint NOT NULL,
	`smokes` tinyint NOT NULL,
	`drink_alcohol` tinyint NOT NULL,
	`patients_id` int NOT NULL,
	PRIMARY KEY (`id`),
	KEY `fk_suplementary_data_patients_idx` (`patients_id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

CREATE TABLE `test_types` (
	`id` int NOT NULL AUTO_INCREMENT,
	`description` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

CREATE TABLE `users` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`email` varchar(50) NOT NULL,
	`username` varchar(50) NOT NULL,
	`password` varchar(100) NOT NULL,
	`role` enum('electroencefalograma', 'prueba psicologica', 'resonancia magnetica', 'administrador') NOT NULL,
	`created_at` datetime NOT NULL DEFAULT current_timestamp(),
	`updated_at` datetime,
	`deleted_at` datetime,
	`verified_at` datetime,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `pmi_db`.`mri`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pmi_db`.`mri` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `mri_route` VARCHAR(100) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `patients_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_MRI_patients1_idx` (`patients_id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

-- -----------------------------------------------------
-- Table `pmi_db`.`brain_structure`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pmi_db`.`brain_structure` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB,
CHARSET utf8mb3;

-- -----------------------------------------------------
-- Table `pmi_db`.`EGG`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pmi_db`.`EGG` (
  `id` INT NOT NULL,
  `file_route_egg` VARCHAR(45) NOT NULL,
  `patients_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_EGG_patients1_idx` (`patients_id`)) 
ENGINE = InnoDB,
CHARSET utf8mb3;

-- -----------------------------------------------------
-- Table `pmi_db`.`feature_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pmi_db`.`feature_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB,
CHARSET utf8mb3;

-- -----------------------------------------------------
-- Table `pmi_db`.`mri_has_brain_structure`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pmi_db`.`mri_has_brain_structure` (
  `mri_id` INT NOT NULL,
  `brain_structure_id` INT NOT NULL,
  `volume_mm3` FLOAT NOT NULL,
  PRIMARY KEY (`mri_id`, `brain_structure_id`),
  KEY `fk_mri_has_brain_structure_brain_structure1_idx` (`brain_structure_id` ASC) VISIBLE,
  KEY `fk_mri_has_brain_structure_mri1_idx` (`mri_id`))
ENGINE = InnoDB,
CHARSET utf8mb3;

-- -----------------------------------------------------
-- Table `pmi_db`.`segment_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pmi_db`.`segment_types` (
  `id` INT NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB,
CHARSET utf8mb3;

-- -----------------------------------------------------
-- Table `pmi_db`.`segments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pmi_db`.`segments` (
  `EGG_id` INT NOT NULL,
  `feature_types_id` INT NOT NULL,
  `segment_types_id` INT NOT NULL,
  `value` DOUBLE NOT NULL,
  PRIMARY KEY (`EGG_id`, `feature_types_id`, `segment_types_id`),
  KEY `fk_EGG_has_feature_types_feature_types1_idx` (`feature_types_id`),
  KEY `fk_EGG_has_feature_types_EGG1_idx` (`EGG_id`),
  KEY `fk_segments_segment_types1_idx` (`segment_types_id`))
ENGINE = InnoDB,
CHARSET utf8mb3;