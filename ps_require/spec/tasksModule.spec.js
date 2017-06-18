describe("The task module", function () {

    beforeEach(function () {

    });

    afterEach(function () {

    });


    describe("add function", function () {
        it("calls taskrenderer.renderNew", function (done) {

            define("renderers/taskRenderer", function () {
                return {
                    renderNew: function () {
                    }
                }
            });

            require(["tasks", "renderers/taskRenderer"],
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
    });
});