/*
    Group 79
	Team Members: Varun Bhat, Evan Monroe
    Project Title: : Online Bookstore Mangement System
    File: DDL.sql
    Citations: Adapted from DDL Assignment
*/

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Dropping tables if they already exist from previous activities
DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS BookAuthors;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Books;
DROP TABLE IF EXISTS Authors;
DROP TABLE IF EXISTS Customers;

-- Customer Table creation
CREATE TABLE Customers (
    customerID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    addressLine1 VARCHAR(255) NOT NULL,
    addressLine2 VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zipCode VARCHAR(255) NOT NULL
);

-- Authors table creation
CREATE TABLE Authors (
    authorID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    bio TEXT
);

-- Books table creation
CREATE TABLE Books (
    bookID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    publicationYear YEAR,
    price DECIMAL(10, 2) NOT NULL,
    stockQuantity INT NOT NULL
);

-- Orders table creation
CREATE TABLE Orders (
    orderID INT AUTO_INCREMENT PRIMARY KEY,
    customerID INT NOT NULL,
    orderDate DATE NOT NULL,
    status VARCHAR(255),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- OrderItems table creation
CREATE TABLE OrderItems (
    orderItemID INT AUTO_INCREMENT PRIMARY KEY,
    orderID INT NOT NULL,
    bookID INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Books(bookID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- BookAuthors table creation
CREATE TABLE BookAuthors (
    bookAuthorID INT AUTO_INCREMENT PRIMARY KEY,
    bookID INT NOT NULL,
    authorID INT NOT NULL,
    FOREIGN KEY (bookID) REFERENCES Books(bookID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (authorID) REFERENCES Authors(authorID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Putting our data into tables where necessary 
INSERT INTO Customers (firstName, lastName, email, addressLine1, city, state, zipCode)
VALUES 
('Cameron', 'Grant', 'cam@gmail.com', '123 Main Street', 'Oakland', 'CA', '94618'),
('Ashley', 'Johnson', 'ash@gmail.com', '530 Elm Street', 'Austin', 'TX', '85028'),
('Michael', 'Levin', 'mike@gmail.com', '418 Pepper Ln', 'Santa Barbara', 'CA', '93111');

INSERT INTO Authors (firstName, lastName, bio)
VALUES 
('John', 'Steinbeck', 'John Steinbeck was an American writer who won the Nobel Prize.'),
('J.K.', 'Rowling', 'J.K. Rowling is a British author best known for writing the "Harry Potter" series.'),
('Edward', 'Abbey', 'Edward Abbey was an American author and environmental advocate.');

INSERT INTO Books (title, publicationYear, price, stockQuantity)
VALUES 
('The Grapes of Wrath', 1939, 22.90, 15),
("Harry Potter and the Sorcerer's Stone", 1997, 21.90, 10),
('Desert Solitaire', 1968, 20.90, 12);

INSERT INTO Orders (customerID, orderDate, status)
VALUES 
(1, '2024-04-18', 'shipped'),
(2, '2024-04-24', 'pending'),
(3, '2024-05-01', 'delivered');

INSERT INTO OrderItems (orderID, bookID, quantity)
VALUES 
(1, 3, 1),
(1, 2, 1),
(2, 1, 1),
(3, 3, 1);

INSERT INTO BookAuthors (bookID, authorID)
VALUES 
(1, 1),
(2, 2),
(3, 3);

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
