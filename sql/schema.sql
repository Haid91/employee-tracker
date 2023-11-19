-- Drop the existing database if it exists
DROP DATABASE IF EXISTS work_db;

-- Create a new database
CREATE DATABASE work_db;

-- Select the newly created database for use
USE work_db;

-- Create the department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,  -- Ensuring name is not null for consistency
    PRIMARY KEY (id)
);

-- Create the role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,  -- Ensuring title is not null for consistency
    salary DECIMAL(10, 2) NULL,  -- Adjusted scale for salary
    department_id INT NOT NULL,  -- Ensuring department_id is not null for consistency
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) -- Adding foreign key constraint
);

-- Create the employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,  -- Ensuring first_name is not null for consistency
    last_name VARCHAR(45) NOT NULL,  -- Ensuring last_name is not null for consistency
    role_id INT NULL,
    manager_id INT NULL,  -- Allowing NULL for top-level employees with no managers
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),  -- Adding foreign key constraint
    FOREIGN KEY (manager_id) REFERENCES employee(id)  -- Adding foreign key constraint for self-referencing
);