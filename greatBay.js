var mysql = require("mysql");
var password = require("./pw"); 


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

}

function bidAuction(){ 

}

