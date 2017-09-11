var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyCC9oEEyS4F3wtPBoiBI4dxcWtEXa1z_mM",
    authDomain: "testefirebase-3b517.firebaseapp.com",
    databaseURL: "https://testefirebase-3b517.firebaseio.com",
    projectId: "testefirebase-3b517",
    storageBucket: "testefirebase-3b517.appspot.com",
    messagingSenderId: "727875462398"
};

firebase.initializeApp(config);
module.exports = firebase;