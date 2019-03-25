DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity);

VALUES ("Miracle Bubbles", "Toys", 18.99, 200),
    ("Cards Against Humanity", "Games", 24.99, 100),
    ("Legally Blonde", "Movies and TV", 19.99, 25),
    ("Tide Detergent", "Home and Kitchen", 17.99, 220),
    ("Beats Solo 3", "Electronics", 99.99, 40),
    ("Cordless Drill", "Tools", 48.99, 25),
    ("Atomic Habits", "Books", 16.00, 75),
    ("Sharpie Assortment", "Office Products", 6.99, 100),
    ("Kindle Paperwhite", "Electronics", 129.99, 65),
    ("Nutribullet", "Home and Kitchen", 49.95, 28);

SELECT * FROM products;