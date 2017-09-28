var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var firebase = require('../service/firebase_config');
var auth = firebase.auth();
var router = express.Router();

// Requisição POST de 'files/build'
router.post('/build', function (req, res, next) {

  var user = auth.currentUser;

  if (user) {

    var uid = user.uid;

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
      ref.child("Users/" + uid).push().set(cryptObject);

      res.redirect('/account');
    });

  } else {
    res.send("Operação possível apenas com autenticação.");
  }

});


// Requisição POST de 'files/update'
// 'key' é um parametro esperado na requisição
router.post('/update/:key', function (req, res, next) {

  var user = auth.currentUser;

  if (user) {

    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {

      var key = req.params.key

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

      // Atualizando objeto do firebase
      var ref = firebase.database().ref();
      var uid = user.uid;
      ref.child("Users/" + uid + "/" + key).update(cryptObject);

      res.redirect('/account');

    });

  } else {
    res.send("Operação possível apenas com autenticação.");
  }

});

// Requisição GET de 'files/build'
router.get('/build', function (req, res, next) {

  var user = auth.currentUser;

  if (user) {
    var objeto = {
      route: '/files/build',
      name: 'Build',
      user: user.displayName,
      icon: "security"
    };
    res.render("send_file", { obj: objeto });
  } else {
    res.redirect('/account/login');
  }

});

// Requisição GET de 'files/update'
// 'key' é um parametro esperado na requisição
router.get('/update/:key', function (req, res, next) {

  var user = auth.currentUser;
  var key = req.params.key;

  if (user) {
    var objeto = {
      route: '/files/update/' + key,
      name: 'Update',
      user: user.displayName
    };

    res.render("send_file", { obj: objeto });
  } else {
    res.redirect('/account/login');
  }

});

// Requisição GET de 'files/delete'
// 'key' é um parametro esperado na requisição
router.get('/delete/:key', function (req, res, next) {

  var user = auth.currentUser;
  var key = req.params.key

  if (user) {

    // Removendo objeto do firebase
    var ref = firebase.database().ref();
    var uid = auth.currentUser.uid;
    ref.child("Users/" + uid + "/" + key).remove();

    res.redirect('/account');

  } else {
    res.redirect('/account/login');
  }

});

module.exports = router;
