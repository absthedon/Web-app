To set up the application: you will need to copy these lines of code in the create_db.sql file into your MySQL command line interface:

CREATE DATABASE IF NOT EXISTS tech_shop_products;
USE tech_shop_products;
CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT, model VARCHAR(50), type_of_device VARCHAR(30), price DECIMAL(5, 2) unsigned, PRIMARY KEY(id));
CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT, first_name VARCHAR(50), last_name VARCHAR(50), username VARCHAR(20), 
password VARCHAR(20), email VARCHAR(50), hashedPassword VARCHAR(100), PRIMARY KEY(id));
CREATE USER IF NOT EXISTS 'tech_shop_products_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON tech_shop_products.* TO ' tech_shop_products_app'@'localhost';

These lines of code create the database needed in MySQL to run the application.

You can also run the code in insert_test_data.sql to insert some data into the database to test if the correct tables are needed.

USE tech_shop_products;
INSERT INTO products (model,type_of_device,price) VALUES ("iPhone 11", "Phone", 150);

This line of code adds the iPhone 11 with a price of £150 into the products table.

To run the application in your command line interface you will need to run the following commands:

npm install express
npm install bcrypt

These commands install the necessary packages needed to run the application.

To use the API provided by the application you can add: api/products to the current page and this will return a list of all the products on the database. If you then add: ?search-term=(type of product that you want) it will return all the products of that same type. 

To use the external API click on the option to search for a type of product on the web and put in the type of product so that it returns a list of different products from the TechSpecs API.