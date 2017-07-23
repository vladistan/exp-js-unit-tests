var app = angular.module("homeIndex", ["ngRoute"]);


app.config(

    function ($routeProvider) {

    $routeProvider.when("/",
        {
            controller: "topicsController",
            templateUrl: "/Templates/topicsView.html"
        });

        $routeProvider.when("/newMessage",
            {
                controller: "newTopicController",
                templateUrl: "/Templates/newTopicView.html"
            });

    $routeProvider.otherwise("/");

});

app.controller("topicsController", function ($scope, $http) {

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

app.controller("newTopicController",  function ($scope, $http, $window) {

        console.log("Initialize new topic controller");

        $scope.newTopic = {};

        $scope.save = function() {
            console.log("NT [T]: " + $scope.newTopic.title);
            console.log("NT [B]: " + $scope.newTopic.body);

            $http.post("/api/v1/topics", $scope.newTopic).then(
                function success(result) {
                    var newTopic = result.data;

                    $window.location = "#/";
                },
                function error() {
                    alert("Cannot post new topic");
                });
        }



});