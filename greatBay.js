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

  // inquirer
  //   .prompt([
  //     {
  //       name: "item",
  //       type: "input",
  //       message: "What is the item you would like to submit?"
  //     },
  //     {
  //       name: "category",
  //       type: "input",
  //       message: "What category would you like to place your auction in?"
  //     },
  //     {
  //       name: "startingBid",
  //       type: "input",
  //       message: "What would you like your starting bid to be?",
  //       validate: function(value) {
  //         if (isNaN(value) === false) {
  //           return true;
  //         }
  //         return false;
  //       }
  //     }
  //   ])
  //   .then(function(answer) {
  //     // when finished prompting, insert a new item into the db with that info
  //     connection.query(
  //       "INSERT INTO auctions SET ?",
  //       {
  //         item_name: answer.item,
  //         category: answer.category,
  //         starting_bid: answer.startingBid || 0,
  //         highest_bid: answer.startingBid || 0
  //       },
  //       function(err) {
  //         if (err) throw err;
  //         console.log("Your auction was created successfully!");
  //         // re-prompt the user for if they want to bid or post
  //         start();
  //       }
  //     );
  //   });

}

function bidAuction(){ 

}

