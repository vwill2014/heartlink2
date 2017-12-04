// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "home.html"));
});

// Get all characters
app.get("/all", function(req, res) {
  res.json(heartLink);
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:heartLink?", function(req, res) {
  var chosen = req.params.heartLink;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < heartLink.length; i++) {
      if (chosen === heartLink[i].routeName) {
        return res.json(heartLink[i]);
      }
    }
    return res.json(false);
  }
  return res.json(heartLink);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newheartLink = req.body;

  console.log(newheartLink);

  // We then add the json the user sent to the character array
  heartLink.push(newheartLink);

  // We then display the JSON to the users
  res.json(newheartLink);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
