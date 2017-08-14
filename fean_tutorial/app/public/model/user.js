var bcrypt = require("bcrypt-nodejs");
var firebase = require("firebase");

try{
    var config = {
        apiKey: "AIzaSyCC9oEEyS4F3wtPBoiBI4dxcWtEXa1z_mM",
        authDomain: "testefirebase-3b517.firebaseapp.com",
        databaseURL: "https://testefirebase-3b517.firebaseio.com",
        projectId: "testefirebase-3b517",
        storageBucket: "testefirebase-3b517.appspot.com",
        messagingSenderId: "727875462398"
    };

    firebase.initializeApp(config);
}catch(err){
    console.log("Não foi possivel conectar no firebase: " + err.message);
}


function UserModel(nome, email, password){

    this.n = nome;
    this.e = email;
    this.p = bcrypt.hashSync(password);
}

UserModel.prototype.getPassword = function(){
    return this.p;
}

UserModel.prototype.getEmail = function(){
    return this.e;
}

UserModel.prototype.getName = function(){
    return this.n;
}

UserModel.prototype.save = function(){

    firebase.database().ref("user").push().set({
        nome: this.n,
        email: this.e,
        password: this.p
    })
}

module.exports = UserModel;