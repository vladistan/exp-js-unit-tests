/// <reference path="../scripts/jasmine/jasmine.js"/>
/// <reference path="../../messageboard/js/app.js" />


describe("myapp -> ", function() {

    it("Is Debug",
        function() {
            var a = 12;
            var b = 7;
            var c = a * b;
            expect(napp.isDebug).toEqual(true);
        });

    it(" has B with correct value",
        function() {
            expect(b).toEqual(12);
        });

    it(" has defined app",
        function() {

            expect(napp).not.toBe(0);

        });

    it("log",
        function() {
            expect(napp.log).toBeDefined();
        });


})