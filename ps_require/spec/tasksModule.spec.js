describe("The Task module", function () {

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


    describe("add function", function () {

        beforeEach(function (done) {
            injector.mock("renderers/taskRenderer", {
                renderNew: function () {},
                render: function() {}
            });

            injector.mock("data/taskData", {
                clear: function() {}
            });

            injector.mock("renderers/logModule", {
                addMessage: function (msg) {
                }
            });

            done();
        });

        it("calls taskrenderer.renderNew", function (done) {

            injector.require(["tasks", "renderers/taskRenderer"],
                function (tasks, taskRenderer) {
                    spyOn(taskRenderer, "renderNew");
                    tasks.add();
                    expect(taskRenderer.renderNew).toHaveBeenCalled();
                    done();
                },
                function (error) {
                    done.fail(error);
                });
        });

        it("Add task logs the action", function (done) {

            injector.require(["tasks", "renderers/logModule"],
                function (tasks, logRenderer) {

                    spyOn(logRenderer, "addMessage");
                    tasks.add();
                    expect(logRenderer.addMessage).toHaveBeenCalled();
                    done();
                },
                function (error) {
                    done.fail(error);
                });
        });

        it(": remove task logs the action", function (done) {

            injector.require(["tasks", "renderers/logModule"],
                function (tasks, logRenderer) {

                    spyOn(logRenderer, "addMessage");
                    tasks.clear();
                    expect(logRenderer.addMessage).toHaveBeenCalled();
                    done();
                },
                function (error) {
                    done.fail(error);
                });
        });
    });
});