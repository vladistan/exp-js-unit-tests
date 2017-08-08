/// <reference path="../scripts/jasmine/jasmine.js"/>
/// <reference path="../../mboard.frontend/scripts/angular.min.js" />
/// <reference path="../../mboard.frontend/scripts/angular-mocks.js" />
/// <reference path="../../mboard.frontend/scripts/angular-route.js" />
/// <reference path="../../mboard.frontend/js/homeindex.js" />

/// <reference path="../../mboard.frontend/js/hojjmeindex.js" />


describe("Home Index Tests -> ",
    function () {

        var $httpBackend;

        beforeEach(function() {
            module('homeIndex');
        });

        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get("$httpBackend");

            $httpBackend.when("GET", "/api/v1/Topics?includeReplies=True").
                respond([
                    {
                        title: 'Hello',
                        body: 'Hi there',
                        id: 5,
                        created: "20050101"
                    }]);

        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe("App -> ",
            function() {

                it("Has correct holder variable",
                    function() {
                        expect(app).not.toBeNull();
                    });

            });

        describe("TopicsController -> ", function() {

            it('loads data',
                inject(function ($controller, $http, dataservice) {

                    var theScope = {};

                    var ctrl = $controller('topicsController',
                        {
                            $scope: theScope,
                            dataservice: dataservice,
                            $http: $http
                        });

                    expect(theScope.isBusy).toBe(true);


                    $httpBackend.flush();

                    expect(ctrl).not.toBeNull();
                    expect(theScope.data).toBeDefined();
                    expect(theScope.data.topics.length).toBe(1);
                    expect(theScope.data.topics[0].body).toBe('Hi there');
                    expect(theScope.data.topics[0].id).toBe(5);
                    expect(theScope.data.topics[0].title).toBe('Hello');
                    expect(theScope.isBusy).toBe(false);



                }));
        });

        describe("DataService -> ",
            function() {

                it("Has inject",
                    function() {
                        expect(inject).not.toBeNull();
                    });

                it("Can load topics", function() {
                    inject(function(dataservice) {

                        expect(dataservice.topics).toEqual([]);

                        $httpBackend.expectGET("/api/v1/Topics?includeReplies=True");
                        dataservice.getTopics().then(
                            function() {
                                expect(dataservice.topics.length).toBeGreaterThan(0);
                                expect(dataservice.topics[0].body).toBe('Hi there');
                                expect(dataservice.topics[0].title).toBe('Hello');
                                expect(dataservice.topics[0].id).toBe(5);


                            },
                            function() {
                                fail();

                            });

                    });

                    $httpBackend.flush();
                });

            });
    });