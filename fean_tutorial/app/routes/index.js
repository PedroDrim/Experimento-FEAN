var express = require("express");
var path = require("path");
var User = require("../public/model/user");
var router = express.Router();

router.get("/", function(req,res){
    res.sendFile(path.join(__dirname + "/../public/views/index.html"));
})

router.post("/users", function(req,res){
    var newUser = new User(req.body.nome, req.body.email, req.body.password);
    newUser.save();
    res.send("ok");
})

module.exports = router;