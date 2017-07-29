/// <reference path="../scripts/jasmine/jasmine.js"/>
/// <reference path="../../messageboard/scripts/angular.min.js" />
/// <reference path="../../messageboard/scripts/angular-mocks.js" />
/// <reference path="../../messageboard/scripts/angular-route.js" />
/// <reference path="../../messageboard/js/homeindex.js" />

/// <reference path="../../messageboard/js/hojjmeindex.js" />


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


        describe("DataService -> ",
            function() {

                it("Has inject",
                    function() {
                        expect(inject).not.toBeNull();
                    });

                it("Can load topics", function() {
                    inject(function(dataservice) {

                        expect(dataservice.topics).toEqual([]);

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