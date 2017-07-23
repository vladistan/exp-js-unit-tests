var app = angular.module("myApp", []);


app.controller("homeIndexController", function ($scope, $http) {

    console.log("Inside of the home controller");

    $scope.messages = [];
    $scope.isBusy = true;

    $http.get("/api/v1/Topics?includeReplies=True").then(
        function(result) {
            console.log("Loaded messages");
            angular.copy(result.data, $scope.messages);
        },
        function() {
            console.log("Failed to load messages");
        }

        ).then(
        function() {
            $scope.isBusy = false;
        });


});