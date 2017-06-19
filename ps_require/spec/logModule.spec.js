describe("The log Module", function () {

    var injector;

    beforeEach(function (done) {
        require(["Squire"], function (Squire) {
            injector = new Squire();
            done();
        });
    });

    afterEach(function () {
        injector.remove();
    });

    it('Can add messages to the renderer', function (done) {

        injector.mock("renderers/logModule", {
            addMessage: function (msg) {}
        });

        injector.require(["log", "renderers/logModule"],
            function (log, logRenderer) {
                spyOn(logRenderer, "addMessage");
                log.addMessage("Hello");
                expect(logRenderer.addMessage).toHaveBeenCalled();
                done();
            },
            function (error) {
                done.fail(error);
            });

    });



});