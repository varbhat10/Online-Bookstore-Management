/*
    Group 79
	  Team Members: Varun Bhat, Evan Monroe
    Project Title: : Online Bookstore Mangement System
    File: app.js
    Citations: Lots of code based off CS 340 starter code.
*/

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db-connector");
const path = require("path");

const app = express();
const PORT = 65518;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// GET all books
app.get("/books", (req, res) => {
  const query = "SELECT * FROM Books";
  db.pool.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

// POST a new book
app.post("/books", (req, res) => {
  const { title, publicationYear, price, stockQuantity, authorID } = req.body;
  const insertBookQuery =
    "INSERT INTO Books (title, publicationYear, price, stockQuantity) VALUES (?, ?, ?, ?)";
  db.pool.query(
    insertBookQuery,
    [title, publicationYear, price, stockQuantity],
    (err, results) => {
      if (err) return res.status(500).send(err);
      const bookID = results.insertId;
      const insertBookAuthorQuery =
        "INSERT INTO BookAuthors (bookID, authorID) VALUES (?, ?)";
      db.pool.query(insertBookAuthorQuery, [bookID, authorID], (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send("Book added successfully");
      });
    }
  );
});

// PUT (update) a book
app.put("/books/:id", (req, res) => {
  const { title, publicationYear, price, stockQuantity } = req.body;
  const { id } = req.params;
  const updateQuery =
    "UPDATE Books SET title = ?, publicationYear = ?, price = ?, stockQuantity = ? WHERE bookID = ?";
  db.pool.query(
    updateQuery,
    [title, publicationYear, price, stockQuantity, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Book updated successfully");
    }
  );
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const deleteQuery = "DELETE FROM Books WHERE bookID = ?";
  db.pool.query(deleteQuery, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Book deleted successfully");
  });
});

// Serve the books HTML file
app.get("/books.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "books.html"));
});

// GET all customers
app.get("/customers", (req, res) => {
  const query = "SELECT * FROM Customers";
  db.pool.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

// POST a new customer
app.post("/customers", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
  } = req.body;
  const insertCustomerQuery =
    "INSERT INTO Customers (firstName, lastName, email, addressLine1, addressLine2, city, state, zipCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.pool.query(
    insertCustomerQuery,
    [
      firstName,
      lastName,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
    ],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).send("Customer added successfully");
    }
  );
});

// PUT (update) a customer
app.put("/customers/:id", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
  } = req.body;
  const { id } = req.params;
  const updateCustomerQuery =
    "UPDATE Customers SET firstName = ?, lastName = ?, email = ?, addressLine1 = ?, addressLine2 = ?, city = ?, state = ?, zipCode = ? WHERE customerID = ?";
  db.pool.query(
    updateCustomerQuery,
    [
      firstName,
      lastName,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      id,
    ],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Customer updated successfully");
    }
  );
});

// DELETE a customer
app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  const deleteCustomerQuery = "DELETE FROM Customers WHERE customerID = ?";
  db.pool.query(deleteCustomerQuery, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Customer deleted successfully");
  });
});

// Serve the customers HTML file
app.get("/customers.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "customers.html"));
});

// GET all authors
app.get("/authors", (req, res) => {
  const query = "SELECT * FROM Authors";
  db.pool.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

// POST a new author
app.post("/authors", (req, res) => {
  const { firstName, lastName, bio } = req.body;
  const insertAuthorQuery =
    "INSERT INTO Authors (firstName, lastName, bio) VALUES (?, ?, ?)";
  db.pool.query(
    insertAuthorQuery,
    [firstName, lastName, bio],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).send("Author added successfully");
    }
  );
});

// PUT (update) an author
app.put("/authors/:id", (req, res) => {
  const { firstName, lastName, bio } = req.body;
  const { id } = req.params;
  const updateAuthorQuery =
    "UPDATE Authors SET firstName = ?, lastName = ?, bio = ? WHERE authorID = ?";
  db.pool.query(updateAuthorQuery, [firstName, lastName, bio, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Author updated successfully");
  });
});

// DELETE an author
app.delete("/authors/:id", (req, res) => {
  const { id } = req.params;
  const deleteAuthorQuery = "DELETE FROM Authors WHERE authorID = ?";
  db.pool.query(deleteAuthorQuery, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Author deleted successfully");
  });
});

// Serve the authors HTML file
app.get("/authors.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "authors.html"));
});

// GET all orders
app.get('/orders', function(req, res) {
  const selectQuery = `
      SELECT o.orderID, c.firstName, c.lastName, o.orderDate, o.status, GROUP_CONCAT(b.title SEPARATOR ', ') AS books, SUM(b.price * oi.quantity) AS totalPrice
      FROM Orders o
      JOIN Customers c ON o.customerID = c.customerID
      JOIN OrderItems oi ON o.orderID = oi.orderID
      JOIN Books b ON oi.bookID = b.bookID
      GROUP BY o.orderID, c.firstName, c.lastName, o.orderDate, o.status;
  `;

  db.pool.query(selectQuery, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.status(200).json(results);
  });
});


// POST a new order
app.post('/orders', function(req, res) {
  const { customerID, orderDate, status, books, quantities } = req.body;

  const insertOrderQuery = 'INSERT INTO Orders (customerID, orderDate, status) VALUES (?, ?, ?)';
  const insertOrderItemsQuery = 'INSERT INTO OrderItems (orderID, bookID, quantity) VALUES ?';

  db.pool.query(insertOrderQuery, [customerID, orderDate, status], (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }

      const orderID = results.insertId;

      const orderItems = books.split(',').map((bookID, index) => [orderID, bookID, quantities.split(',')[index]]);
      db.pool.query(insertOrderItemsQuery, [orderItems], (err, results) => {
          if (err) {
              return res.status(500).send(err);
          }

          res.status(201).send('Order added successfully');
      });
  });
});

// PUT (update) an order
app.put('/orders/:id', function(req, res) {
  const { customerID, orderDate, status, books, quantities } = req.body;
  const { id } = req.params;

  const updateOrderQuery = 'UPDATE Orders SET customerID = ?, orderDate = ?, status = ? WHERE orderID = ?';
  const deleteOrderItemsQuery = 'DELETE FROM OrderItems WHERE orderID = ?';
  const insertOrderItemsQuery = 'INSERT INTO OrderItems (orderID, bookID, quantity) VALUES ?';

  db.pool.query(updateOrderQuery, [customerID, orderDate, status, id], (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }

      db.pool.query(deleteOrderItemsQuery, [id], (err, results) => {
          if (err) {
              return res.status(500).send(err);
          }

          const orderItems = books.split(',').map((bookID, index) => [id, bookID, quantities.split(',')[index]]);
          db.pool.query(insertOrderItemsQuery, [orderItems], (err, results) => {
              if (err) {
                  return res.status(500).send(err);
              }

              res.send('Order updated successfully');
          });
      });
  });
});

// DELETE an order
app.delete("/orders/:id", (req, res) => {
  const { id } = req.params;
  const deleteOrderQuery = "DELETE FROM Orders WHERE orderID = ?";
  db.pool.query(deleteOrderQuery, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Order deleted successfully");
  });
});

// Serve the orders HTML file
app.get("/orders.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "orders.html"));
});

/*
    LISTENER
*/
app.listen(PORT, () => {
  console.log(
    `Express started on http://localhost:${PORT}; press Ctrl-C to terminate.`
  );
});