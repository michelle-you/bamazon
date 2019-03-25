var mysql = require("mysql");
var inquirer = require("inquirer");
require ("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "NewPassword",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    loadProducts();
  });
  
  function loadProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      getItem(res);
    });
  }
  
  function getItem(inventory) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Which item you would you like to purchase? [Press E to Exit]",
          validate: function(val) {
            return !isNaN(val) || val.toLowerCase() === "e";
          }
        }
      ])
      .then(function(val) {
    
        exitProgram(val.choice);
        var productId = parseInt(val.choice);
        var product = checkInventory(productId, inventory);
  
        if (product) {
          getQuantity(product);
        }
        else {
          console.log("Sorry! That is not an item in the inventory.");
          loadProducts();
        }
      });
  }
  
  function getQuantity(product) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "quantity",
          message: "How many would you like? [Press E to Exit]",
          validate: function(val) {
            return val > 0 || val.toLowerCase() === "e";
          }
        }
      ])
      .then(function(val) {
        exitProgram(val.quantity);
        var quantity = parseInt(val.quantity);
        
        if (quantity > product.stock_quantity) {
          console.log("Insufficient quantity!");
          loadProducts();
        }
        else {
          makePurchase(product, quantity);
        }
      });
  }
  

  function makePurchase(product, quantity) {
    connection.query( "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",[quantity, product.item_id], function(err, res) {
        console.log("\nYou have successfully purchased " + quantity + " " + product.product_name + "'s!");
        loadProducts();
      }
    );
  }
  

  function checkInventory(productId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].item_id === productId) {
        return inventory[i];
      }
    }
    return null;
  }
  

  function exitProgram(choice) {
    if (choice.toLowerCase() === "e") {
      console.log("Thank you! Have a nice day!");
      process.exit();
    }
  }
  