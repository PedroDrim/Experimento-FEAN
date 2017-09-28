var express = require('express');
var firebase = require('../service/firebase_config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var user = firebase.auth().currentUser;

  if(user){
    res.redirect('/account');
  }else{
    res.redirect('/account/login');
  }

});

module.exports = router;
