DROP DATABASE IF EXISTS newShootingRangeV2;
CREATE DATABASE newShootingRangeV2;
USE newShootingRangeV2;
/* This is the part to create the tables */
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_type;
DROP TABLE IF EXISTS invoice_type;
DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS invoice_item;
DROP TABLE IF EXISTS invoice;

CREATE TABLE user_type
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type                VARCHAR(100) NOT NULL,
    isDeleted           BOOL NOT NULL,
    userId              SMALLINT NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW()
);

CREATE TABLE user
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_type_id        SMALLINT UNSIGNED NOT NULL,
    name                VARCHAR(255) NOT NULL,
    email               VARCHAR(255) NOT NULL,
    phoneNumber         VARCHAR(255) NOT NULL,
    isDeleted           BOOL NOT NULL DEFAULT FALSE,
    userId              SMALLINT NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW(),
    CONSTRAINT `fk_user_type`
        FOREIGN KEY (user_type_id) REFERENCES user_type(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

CREATE TABLE invoice_type
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type                VARCHAR(100) NOT NULL,
    description         VARCHAR(255),
    isDeleted           BOOL NOT NULL DEFAULT FALSE,
    userId              VARCHAR(100) NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW()
);

CREATE TABLE location
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(100) NOT NULL,
    capacity            VARCHAR(255),
    isDeleted           BOOL NOT NULL DEFAULT FALSE,
    userId              VARCHAR(100) NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW()
);

CREATE TABLE invoice
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             SMALLINT UNSIGNED NOT NULL,
    invoice_type_id     SMALLINT UNSIGNED NOT NULL,
    is_deleted          BOOL NOT NULL DEFAULT FALSE,
    userId              SMALLINT NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW(),
    CONSTRAINT `fk_user` FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT `fk_invoice_type` FOREIGN KEY (invoice_type_id) REFERENCES invoice_type(id)

);

CREATE TABLE invoice_item
(
    id                  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    invoice_id          SMALLINT UNSIGNED NOT NULL,
    location_id         SMALLINT UNSIGNED NOT NULL,
    number_of_people    SMALLINT NOT NULL,
    number_of_hours     SMALLINT NOT NULL,
    isDeleted           BOOL NOT NULL DEFAULT FALSE,
    userId              VARCHAR(100) NOT NULL,
    created             DATETIME(6) NOT NULL DEFAULT NOW(),
    updated             DATETIME(6) NOT NULL DEFAULT NOW(),
    CONSTRAINT `fk_invoice` FOREIGN KEY (invoice_id) REFERENCES invoice(id),
    CONSTRAINT `fk_location` FOREIGN KEY (location_id) REFERENCES location(id)
);
