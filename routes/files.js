var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var firebase = require('../service/firebase_config');
var auth = firebase.auth();
var router = express.Router();

// Requisição POST de 'files/build'
router.post('/build', function (req, res, next) {

  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {

    // Obtendo hash referente ao arquivo
    var hash = bcrypt.hashSync(file);
    var time = new Date();

    // Montando objeto cryptrografado
    var cryptObject = {
      date: time.toLocaleDateString(),
      time: time.toLocaleTimeString(),
      hash: hash,
      name: filename
    };

    // Inserindo objeto no firebase
    var ref = firebase.database().ref();
    var uid = auth.currentUser.uid;
    ref.child("Users/" + uid).push().set(cryptObject);

    res.redirect('/account');
  });

});

// Requisição POST de 'files/validate'
router.post('/validate', function (req, res, next) {

  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename);

    res.redirect('/account');
  });

});

// Requisição POST de 'files/update'
router.post('/update', function (req, res, next) {

  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename);

    res.redirect('/account');
  });

});

// Requisição GET de 'files/validate'
router.get('/validate', function (req, res, next) {

  var user = auth.currentUser;

  if (user) {
    var objeto = {
      route: 'files/validate',
      name: 'Validate',
      user: user.displayName
    };
    res.render("send_file", { obj: objeto });
  } else {
    res.send("Erro");
  }

});

// Requisição GET de 'files/build'
router.get('/build', function (req, res, next) {

  var user = auth.currentUser;

  if (user) {
    var objeto = {
      route: 'files/build',
      name: 'Build',
      user: user.displayName,
      icon: "security"
    };
    res.render("send_file", { obj: objeto });
  } else {
    res.send("Erro");
  }

});

// Requisição GET de 'files/update'
router.get('/update', function (req, res, next) {

  var user = auth.currentUser;

  if (user) {
    var objeto = {
      route: 'files/update',
      name: 'Update',
      user: user.displayName
    };
    res.render("send_file", { obj: objeto });
  } else {
    res.send("Erro");
  }

});

// Requisição GET de 'files/delete'
// 'key' é um parametro esperado na requisição
router.get('/delete/:key', function (req, res, next) {
  
    var user = auth.currentUser;
  
    if (user) {
      var key = req.params.key
      
      // Removendo objeto do firebase
      var ref = firebase.database().ref();
      var uid = auth.currentUser.uid;
      ref.child("Users/" + uid + "/" + key).remove();

      res.redirect('/account');

    } else {
      res.send("Erro");
    }
  
});

module.exports = router;
