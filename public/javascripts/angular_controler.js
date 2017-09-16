var app = angular.module('mybuilder', []);
app.controller('mybuildercontroller', function ($scope, $http) {

    $http.get("/files/user_data.json").then(function (dados) {
        $scope.list = dados.data;
    }, function (err) {
        console.log("ERRO GET: " + err);
    });

});