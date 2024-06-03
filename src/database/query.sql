CREATE DATABASE plantas;

USE plantas;

CREATE TABLE suculentas(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(50),
    sciname varchar(50),
    costo INt
);

SELECT * FROM plantas;


CREATE USER 'plantas'@'localhost' IDENTIFIED BY 'plantas';
GRANT ALL PRIVILEGES ON plantas.* TO 'plantas'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'plantas'@'localhost';
