var express = require('express');
var firebase = require('../service/firebase_config');
var auth = firebase.auth();
var router = express.Router();


// Requisição POST de 'account/login'
router.post('/login', function (req, res, next) {

  var user = auth.currentUser;

  if (!user) {
    // Obtendo formulário com com email-senha
    var email = req.body.email;
    var password = req.body.password;

    // Autenticando usuário no firebase
    auth.signInWithEmailAndPassword(email, password).then(

      // Autenticação realizada com sucesso
      function (result) {
        res.redirect('/account');
      },

      // Falha na autenticação.
      function () {
        res.send("Não foi possível autenticar usuário.");
      }
    )

  } else {
    res.redirect('/account');
  }

});

// Requisição POST de 'account/create'
router.post('/create', function (req, res, next) {

  var user = auth.currentUser;

  if (!user) {

    // Obtendo formulário com email-senha e nome
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;

    // Criando novo usuário
    auth.createUserWithEmailAndPassword(email, password).then(

      // Usuário criado com sucesso
      function (result) {

        // Obtendo referencia do usuário no firebase
        var user = auth.currentUser;

        // Enviando email de revificação
        user.sendEmailVerification();

        // =================================
        // Atualizando perfil do usuário
        user.updateProfile({
          displayName: name,
        }).then(

          // Atualização realizada com sucesso
          function (result) {
            res.redirect('/account');
          },

          // Não foi possivel atualizar o perfil
          function () {
            res.send("Não foi possível configurar o perfil.");
          }
          );
        // =================================

      },

      // Não foi possivel criar o novo usuário
      function () {
        res.send("Não foi possível criar conta.");
      }
    )

  } else {
    res.redirect('/account');
  }

});

// Requisição POST de 'account/reset'
router.post('/reset', function (req, res, next) {

  var user = auth.currentUser;

  if (!user) {

    // Obtendo formulário de email
    var email = req.body.email;

    auth.sendPasswordResetEmail(email).then(

      // Email de reset enviado com sucesso
      function () {
        res.redirect('/account/login');
      },

      // Não foi possivel enviar email de reset
      function (error) {
        res.send("Não foi possível enviar email de reset.");
      }
    );

  } else {
    res.redirect('/account');
  }

});

// Requisição GET de 'account/login'
router.get('/login', function (req, res, next) {

  var user = auth.currentUser;

  if (user) {
    res.redirect('/account');
  } else {
    res.render('account_login');
  }

});

// Requisição GET de 'account/create'
router.get('/create', function (req, res, next) {
  var user = auth.currentUser;

  if (user) {
    res.redirect('/account');
  } else {
    res.render('account_create');
  }

});

// Requisição GET de 'account/reset'
router.get('/reset', function (req, res, next) {

  var user = auth.currentUser;

  if (user) {
    res.redirect('/account');
  } else {
    res.render('account_reset');
  }

});

// Requisição GET de 'account/logout'
router.get('/logout', function (req, res, next) {

  auth.signOut();
  res.redirect('/account/login');
});

// Requisição GET de 'account'
router.get('/', function (req, res, next) {

  // Obtendo referencia do usuário no firebase
  var user = auth.currentUser;

  // Verificando existencia do usuário
  if (user) {

    // Buscando objetos no firebase
    var uid = user.uid;
    var ref = firebase.database().ref("Users/" + uid);

    ref.once("value").then(function (snapshot) {

      var value = snapshot.val();

      res.render('index', {
        user: user.displayName,
        list: value
      });

    });

  } else {
    res.redirect('/account/login');
  }

});

module.exports = router;
