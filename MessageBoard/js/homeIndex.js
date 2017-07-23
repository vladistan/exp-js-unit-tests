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

app.factory("dataservice", function($http, $q) {
    console.log("Data service started");

    var _topics = [];
    var _isInit = false;

    var _isReady = function() {

        return _isInit;
    };

        var _getTopics = function () {

            var deffered = $q.defer();

            $http.get("/api/v1/Topics?includeReplies=True").then(
                function(result) {
                    console.log("Loaded messages");
                    angular.copy(result.data, _topics);
                    _isInit = true;
                    deffered.resolve();
                },
                function() {
                    console.log("Failed to load messages");
                    deffered.reject();
                }
            );

            return deffered.promise;
        };

    var _addTopic = function(newTopic) {

        var deffered = $q.defer();

        $http.post("/api/v1/topics", newTopic).then(
            function success(result) {
                var newlyCreatedTopic = result.data;
                _topics.splice(0, 0, newlyCreatedTopic);
                deffered.resolve(newlyCreatedTopic);
            },
            function error() {
                deffered.reject();
            });


        return deffered.promise;
    }

        return {
            topics: _topics,
            getTopics: _getTopics,
            addTopic: _addTopic,
            isReady: _isReady
        };

    });

app.controller("topicsController", function ($scope, $http, dataservice) {

    console.log("Inside of the home controller");

    $scope.data = dataservice;
    $scope.isBusy = false;

    if (!dataservice.isReady()) {
        $scope.isBusy = true;
        dataservice.getTopics().then(
            function() {
                // ok
            },
            function() {
                // error
            }).then(
            function() {
                $scope.isBusy = false;
            });
    }

});

app.controller("newTopicController",  function ($scope, $http, $window, dataservice) {

        console.log("Initialize new topic controller");

        $scope.newTopic = {};

        $scope.save = function() {
            console.log("NT [T]: " + $scope.newTopic.title);
            console.log("NT [B]: " + $scope.newTopic.body);

            dataservice.addTopic($scope.newTopic).then(
                function() {
                    // ok
                    $window.location = "#/";
                },
                function() {
                    // error
                    alert("Could not create new topic");
                }
                );



        }



});