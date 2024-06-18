/*
    Group 79
	Team Members: Varun Bhat, Evan Monroe
    Project Title: : Online Bookstore Management System
    File: DML.sql
    Citations: Adapted from DML Assignment
*/

-- Get list of books from title (search func)
SELECT * FROM Books WHERE title LIKE CONCAT('%', :titleInput, '%');

-- Grab details for specific book
SELECT * FROM Books WHERE bookID = :bookID;

-- Get customer details by email
SELECT * FROM Customers WHERE email = :emailInput;

-- Show all orders from specific customer
SELECT * FROM Orders WHERE customerID = :customerID;

-- Book and author listing (detailed)
SELECT b.title, a.firstName, a.lastName FROM Books b
JOIN BookAuthors ba ON b.bookID = ba.bookID
JOIN Authors a ON ba.authorID = a.authorID;

-- Add new customer
INSERT INTO Customers (firstName, lastName, email, addressLine1, city, state, zipCode)
VALUES (:firstName, :lastName, :email, :addressLine1, :city, :state, :zipCode);

-- Place new order and add order items
INSERT INTO Orders (customerID, orderDate, status)
VALUES (:customerID, :orderDate, :status);
INSERT INTO OrderItems (orderID, bookID, quantity)
VALUES (LAST_INSERT_ID(), :bookID, :quantity);

-- Add new book and associate with an author
INSERT INTO Books (title, publicationYear, price, stockQuantity)
VALUES (:title, :publicationYear, :price, :stockQuantity);
INSERT INTO BookAuthors (bookID, authorID)
VALUES (LAST_INSERT_ID(), :authorID); 

-- Update customer info
UPDATE Customers
SET firstName = :firstName, lastName = :lastName, email = :email, addressLine1 = :addressLine1, city = :city, state = :state, zipCode = :zipCode
WHERE customerID = :customerID;

-- Update book stock quantity
UPDATE Books
SET stockQuantity = :newStockQuantity
WHERE bookID = :bookID;

-- Update order status
UPDATE Orders
SET status = :newStatus
WHERE orderID = :orderID;

-- Remove book from inventory
DELETE FROM Books WHERE bookID = :bookID;

-- Delete a customer and associated orders (w cascade)
DELETE FROM Customers WHERE customerID = :customerID;

-- Retrieve data from each table (general listing)
SELECT * FROM Customers;
SELECT * FROM Authors;
SELECT * FROM Books;
SELECT * FROM Orders;
SELECT * FROM OrderItems;
SELECT * FROM BookAuthors;

-- Detailed retrieval of order and item details
SELECT o.orderID, o.orderDate, o.status, oi.bookID, oi.quantity
FROM Orders o
JOIN OrderItems oi ON o.orderID = oi.orderID
WHERE o.orderID = :orderID;
