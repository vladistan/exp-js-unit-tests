var app = angular.module("myApp", []);


app.controller("homeIndexController", function ($scope) {

    console.log("Inside of the home controller");

    $scope.name = "Bob the operator";

});