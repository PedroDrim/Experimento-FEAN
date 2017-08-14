var express = require("express");
var morgan = require("morgan");
var bodyparser = require("body-parser");
var index = require("./app/routes/index");

var port = process.env.PORT || 8090;
var app = express();

app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(index);

app.listen(port, function(){
    console.log("Running the server at port " + port);
});