var express = require('express');
var firebase = require('../service/firebase_config');
var router = express.Router();

router.post('/login', function (req, res, next) {

  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(function (result) {
      //This gives you a Google Access Token.
      res.redirect('/account');
    })
    .catch(function (err) {
      res.send("Erro");
    })

});

router.post('/create', function (req, res, next) {

  var auth = firebase.auth();
  auth.createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(function (result) {

      //======================================
      //This gives you a Google Access Token.
      var user = auth.currentUser;
      user.sendEmailVerification();

      user.updateProfile({
        displayName: req.body.name,
      })
        .then(function () {
          // Update successful.
          res.redirect('/account');
        })
        .catch(function (error) {
          // An error happened.
          res.send("Erro");
        });
      //======================================

    })
    .catch(function (err) {
      res.send("Erro");
    })

});

router.post('/reset', function (req, res, next) {

  var auth = firebase.auth();
  auth.sendPasswordResetEmail(req.body.email).then(function () {
    // Email sent.
    res.redirect('/account/login');
  }, function (error) {
    // An error happened.
  });

});

router.get('/login', function (req, res, next) {
  res.render('account_login');
});

router.get('/create', function (req, res, next) {
  res.render('account_create');
});

router.get('/reset', function (req, res, next) {
  res.render('account_reset');
});

router.get('/', function (req, res, next) {

  var user = firebase.auth().currentUser;

  if (user) {
    // User is signed in.
    res.render('index');
  } else {
    // No user is signed in.
    res.send("Erro");
  }

});

module.exports = router;
