var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var firebase = require('../service/firebase_config');
var router = express.Router();

router.post('/build', function (req, res, next) {

  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {

    var hash = bcrypt.hashSync(file);
    var time = new Date();
    var cryptObject = {
      date: time.toLocaleDateString(),
      time: time.toLocaleTimeString(),
      hash: hash,
      name: filename
    };

    var ref = firebase.database().ref();
    ref.child("Users").push().set(cryptObject);

    res.render('result');
  });

});

router.post('/validate', function (req, res, next) {

  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename);
  });

});

module.exports = router;
