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
        name: "postOrBid",
        type: "list",
        message: "Would you like to [POST] an auction or [BID] on an auction?",
        choices: ["POST", "BID", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.postOrBid === "POST") {
          postAuction();
        }
        else if(answer.postOrBid === "BID") {
          bidAuction();
        } else{
          connection.end();
        }
      });

}


function queryAllAuctions() {
  var query = connection.query("SELECT * FROM auctions", function(err, res) {
    if (err) throw err;
    console.log(res);
    console.log(query.sql);

  });
}


