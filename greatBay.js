var mysql = require("mysql");
var password = require("./pw"); 
var inquirer = require("inquirer"); 


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: password,
  database: "greatBay_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startingPrompt(); 
    // queryDanceSongs();

  // end connection after getting what you need 
  connection.end();
});


function startingPrompt(){ 
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Would you like to post an item or bid on an existing auction?",
        choices: ["Post", "Bid"]
      })
      .then(function(answer) {
        if (answer.postOrBid === "Post") {
          postItem();
        }
        else if(answer.postOrBid === "Bid") {
          bidAuction();
        }
      });

}

function postItem(){ 

  inquirer.prompt ([
    {
      name: "item", 
      type: "input", 
      message: "What type of item do you want to sell?"
    }, 
    { 
      name: "category", 
      type: "list", 
      message: "What type of item is this?",
      choices: ["Electronics", "Clothing/Shoes", "Furniture", "Decorations", "Kitchen/Dining", "Lawn and Garden"]
    },
    { 
      name: "price", 
      type: "input", 
      message: "What is the starting bid?"
    }, 
    { 
      name: "description", 
      type: "input", 
      message: "Describe your item in a sentence or two."
    }
  ])
    .then(function(answer){ 
        var query = connection.query ("INSERT INTO auctions SET ?",
        {
          itemName: answer.item,
          category: answer.category,
          description: answer.description, 
          price: answer.price,
          highestBid: 0
        },
        function(err) {
          if (err) throw err;
          console.log(query.sql); 
          console.log("Your item was added");
        }
        );
      });
}

function bidAuction(){ 

  // inquirer.prompt ([
  //   {
  //     name: "item", 
  //     type: "input", 
  //     message: "What type of item do you want to sell?"
  //   }, 
  //   { 
  //     name: "category", 
  //     type: "list", 
  //     message: "What type of item is this?",
  //     choices: ["Electronics", "Clothing/Shoes", "Furniture", "Decorations", "Kitchen/Dining", "Lawn and Garden"]
  //   },
  //   { 
  //     name: "price", 
  //     type: "input", 
  //     message: "What is the starting bid?"
  //   }, 
  //   { 
  //     name: "description", 
  //     type: "input", 
  //     message: "Describe your item in a sentence or two."
  //   }
  // ])
  //   .then(function(answer){ 
  //       var query = connection.query ("INSERT INTO auctions SET ?",
  //       {
  //         itemName: answer.item,
  //         category: answer.category,
  //         description: answer.description, 
  //         price: answer.price,
  //         highestBid: 0
  //       },
  //       function(err) {
  //         if (err) throw err;
  //         console.log(query.sql); 
  //         console.log("Your item was added");
  //       }
  //     );
  //   });
  }



  