/* This is the part to create the tables */
DROP TABLE IF EXISTS user_type;
DROP TABLE IF EXISTS invoice_type;
DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS invoice_item;
DROP TABLE IF EXISTS invoice;
DROP TABLE IF EXISTS instructors;
DROP TABLE IF EXISTS user_list;
DROP TABLE IF EXISTS update_users_logs;
DROP TABLE IF EXISTS global_variables;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS blocking_segments;

CREATE TABLE user_type
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type                VARCHAR(100) NOT NULL,
    isDeleted           BOOLEAN NOT NULL,
    userId              SMALLINT NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW()
);

CREATE TABLE user_list
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_type_id        SMALLINT UNSIGNED NOT NULL,
    name                VARCHAR(255) NOT NULL,
    email               VARCHAR(255) NOT NULL,
    phoneNumber         VARCHAR(255) NOT NULL,
    shootingPermit      VARCHAR(100),
    isDeleted           BOOLEAN NOT NULL DEFAULT FALSE,
    userId              SMALLINT NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW(),
    CONSTRAINT `fk_user_type`
        FOREIGN KEY (user_type_id) REFERENCES user_type(id)
            ON DELETE CASCADE
            ON UPDATE RESTRICT
)
    CHARACTER SET 'utf8mb4'
    COLLATE 'utf8mb4_czech_ci';

CREATE TABLE invoice_type
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type                VARCHAR(100) NOT NULL,
    description         VARCHAR(255),
    isDeleted           BOOLEAN NOT NULL DEFAULT FALSE,
    userId              VARCHAR(100) NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW()
);

CREATE TABLE location
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(100) NOT NULL,
    comment             VARCHAR(255),
    isDeleted           BOOLEAN NOT NULL DEFAULT FALSE,
    userId              VARCHAR(100) NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW()
)
    CHARACTER SET 'utf8'
    COLLATE 'utf8_general_ci';

CREATE TABLE invoice
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             SMALLINT UNSIGNED NOT NULL,
    invoice_type_id     SMALLINT UNSIGNED NOT NULL,
    parent_invoice      SMALLINT DEFAULT NULL,
    is_deleted          BOOLEAN NOT NULL DEFAULT FALSE,
    comment             VARCHAR(150) DEFAULT NULL,
    uuidInvoice         VARCHAR(250),
    userId              SMALLINT NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW(),
    CONSTRAINT `fk_user` FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT `fk_invoice_type` FOREIGN KEY (invoice_type_id) REFERENCES invoice_type(id)
)
    CHARACTER SET 'utf8'
     COLLATE 'utf8_general_ci';

CREATE TABLE invoice_item
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    invoice_id          SMALLINT UNSIGNED NOT NULL,
    location_id         SMALLINT UNSIGNED NOT NULL,
    number_of_people    SMALLINT NOT NULL,
    number_of_hours     SMALLINT NOT NULL,
    with_instructor     BOOLEAN NOT NULL DEFAULT FALSE,
    start_time          DATETIME,
    end_time            DATETIME,
    isDeleted           BOOLEAN NOT NULL DEFAULT FALSE,
    userId              VARCHAR(100) NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW(),
    CONSTRAINT `fk_invoice` FOREIGN KEY (invoice_id) REFERENCES invoice(id),
    CONSTRAINT `fk_location` FOREIGN KEY (location_id) REFERENCES location(id)
)
    CHARACTER SET 'utf8'
    COLLATE 'utf8_general_ci';

CREATE TABLE instructors
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(100) NOT NULL,
    color               VARCHAR(100) NOT NULL,
    isDeleted           BOOLEAN NOT NULL DEFAULT FALSE,
    userId              VARCHAR(100) NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW()
);

CREATE TABLE instructor_segments
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    instructor_id       SMALLINT UNSIGNED NOT NULL,
    guid                VARCHAR(100) NOT NULL,
    start_time          DATETIME,
    end_time            DATETIME,
    isDeleted           BOOLEAN NOT NULL DEFAULT FALSE,
    userId              VARCHAR(100) NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW(),
    CONSTRAINT `fk_instructor` FOREIGN KEY (instructor_id) REFERENCES instructors(id)
);
CREATE TABLE global_variables
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(100) NOT NULL,
    value               VARCHAR(100) NOT NULL,
    comment             VARCHAR(100) NOT NULL,
    userId              VARCHAR(100) NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW()
)    CHARACTER SET 'utf8'
     COLLATE 'utf8_general_ci';
CREATE TABLE update_users_logs
(
    id                  MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    user_id             MEDIUMINT NOT NULL,
    transaction_type    VARCHAR(100),
    name_field_changed  VARCHAR(255),
    old_value           VARCHAR(255),
    new_value           VARCHAR(255),
    entry_update_on     DATETIME(6) NOT NULL DEFAULT NOW()
);
CREATE TABLE services
(
    id                  MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    location_id         SMALLINT UNSIGNED NOT NULL,
    name                VARCHAR(100),
    min_capacity        SMALLINT NOT NULL,
    max_capacity        SMALLINT NOT NULL,
    comment             VARCHAR(255),
    isDeleted           BOOLEAN NOT NULL DEFAULT FALSE,
    userId              VARCHAR(100) NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW(),
    CONSTRAINT `fk_location` FOREIGN KEY (location_id) REFERENCES location(id)
)
    CHARACTER SET 'utf8'
    COLLATE 'utf8_general_ci';
CREATE TABLE blocking_segments
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(100) NOT NULL,
    guid                VARCHAR(100) NOT NULL,
    start_time          DATETIME,
    end_time            DATETIME,
    isDeleted           BOOLEAN NOT NULL DEFAULT FALSE,
    userId              VARCHAR(100) NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW()
)
    CHARACTER SET 'utf8'
    COLLATE 'utf8_general_ci';