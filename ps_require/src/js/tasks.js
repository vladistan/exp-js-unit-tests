define(["jquery", "log", "data/taskData", "renderers/taskRenderer"], function ($, log, taskData, taskRenderer) {

    "use strict;"


    /* task management */

    function add() {
        log.addMessage("Add new task");
        taskRenderer.renderNew();
    }

    function remove(clickEvent) {
        log.addMessage("Remove task")
        var taskElement = clickEvent.target;
        $(taskElement).closest(".task").remove();
    }

    function clear() {
        log.addMessage("Clear all tasks");
        taskData.clear();
        taskRenderer.renderTasks([]);
    }

    function save() {
        log.addMessage("Save");
        var tasks = [];
        $("#task-list .task").each(function (index, task) {
            var $task = $(task);
            tasks.push({
                complete: $task.find(".complete").prop('checked'),
                description: $task.find(".description").val()
            });
        });

        taskData.save(tasks);
    }

    function cancel() {
        taskRenderer.render();
    }

    function render() {
        taskRenderer.renderTasks(taskData.load());
    }

    return {
        add: add,
        remove: remove,
        clear: clear,
        save: save,
        cancel: cancel,
        render: render
    };


});
