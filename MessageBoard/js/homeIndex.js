var app = angular.module("homeIndex", ["ngRoute"]);


app.config(
    function($routeProvider) {

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

        $routeProvider.when("/message/:id",
            {
                controller: "singleTopicController",
                templateUrl: "/Templates/singleTopicView.html"
            });


        $routeProvider.otherwise("/");

    });

app.factory("dataservice",
    function($http, $q) {
        console.log("Data service started");

        var _topics = [];
        var _isInit = false;

        var _isReady = function() {

            return _isInit;
        };

        var _getTopics = function() {

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

        var _findTopic = function(id) {
            var found = null;

            $.each(_topics, function(i, item) {
                if (item.id == id) {
                    found = item;
                    return false;
                }
            });

            return found;
        }

        var _getTopicById = function(id) {

            var deffered = $q.defer();

            var topic;

            if (_isReady()) {
                topic = _findTopic(id);
                if (topic) {
                    deffered.resolve(topic);
                } else {
                    deffered.reject();
                }
            } else {
                _getTopics().then(
                    function() {
                        topic = _findTopic(id);
                        if (topic) {
                            deffered.resolve(topic);
                        } else {
                            deffered.reject();
                        }
                    },
                    function() {
                        deffered.reject();
                        console.log("error getting topic with id" + id);
                    }
                );
            }

            return deffered.promise;
        };

        var _saveReply = function (topic, newReply) {

            var deffered = $q.defer();

            $http.post("/api/v1/topics/" + topic.id + "/replies", newReply).then(
                function (res) {
                    if(topic.replies == null ) {topic.replies = []}
                    topic.replies.push(res.data);
                    deffered.resolve(res.data);
                },
                function() {
                    deffered.reject();
                }
                );

            return deffered.promise;
        }

        return {
            topics: _topics,
            getTopics: _getTopics,
            addTopic: _addTopic,
            isReady: _isReady,
            getTopicById: _getTopicById,
            saveReply: _saveReply
        };

    });

app.controller("singleTopicController",
    function($scope, dataservice, $window, $routeParams) {
        console.log("Single topic controller");

        $scope.topic = null;
        $scope.newReply = {};

        dataservice.getTopicById($routeParams.id).then(
            function(topic) {
                $scope.topic = topic;
            },
            function() {
                window.location = "#!/";
            }
            );

        $scope.saveReply = function() {
            console.log("Adding reply");

            dataservice.saveReply($scope.topic, $scope.newReply).then(
                function() {
                    $scope.newReply.body = "";
                },
                function() {
                    alert("Could not save reply");
                }
            );


        };

    });

app.controller("topicsController",
    function($scope, $http, dataservice) {

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

app.controller("newTopicController",
    function($scope, $http, $window, dataservice) {

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