/* create DOM task elements */

require.config({
    paths: {
        jquery: 'jquery-2.1.1.min'
    }
});

define("taskData", [], function () {
    "use strict;"

    /* load and save data */

    var STORE_NAME = "tasks";

    function saveTaskData(tasks) {
        localStorage.setItem(STORE_NAME, JSON.stringify(tasks));
    }

    function loadTaskData() {
        var storedTasks = localStorage.getItem(STORE_NAME);
        if (storedTasks) {
            return JSON.parse(storedTasks);
        }
        return [];
    }

    function clearTaskData() {
        localStorage.removeItem(STORE_NAME);
    }

    return {
        save: saveTaskData,
        load: loadTaskData,
        clear: clearTaskData
    }

});

define("taskRenderer", ["jquery"], function ($) {
    "use strict;"

    var taskTemplate = '<li class="task">' +
        '<input class="complete" type="checkbox" /> ' +
        '<input class="description" type="text" placeholder="Enter task description..." /> ' +
        '<button class="delete-button">Delete</button>' +
        '</li>';

    function renderTasks(tasks) {
        var elementArray = $.map(tasks, _renderTask);

        $("#task-list")
            .empty()
            .append(elementArray);
    }

    function renderNew() {
        var $taskList = $("#task-list");
        $taskList.prepend(_renderTask({}));
    }

    function _renderTask(task) {
        var $task = $(taskTemplate);
        if (task.complete) {
            $task.find(".complete").attr("checked", "checked");
        }
        $task.find(".description").val(task.description);
        return $task;
    }

    return {
        renderTasks: renderTasks,
        renderNew: renderNew
    };

});

define("tasks", ["jquery", "taskData", "taskRenderer"], function ($, taskData, taskRenderer) {
    "use strict"


    /* task management */

    function add() {
        taskRenderer.renderNew();
    }

    function remove(clickEvent) {
        var taskElement = clickEvent.target;
        $(taskElement).closest(".task").remove();
    }

    function clear() {
        taskData.clear();
        taskRenderer.render();
    }

    function save() {
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

define("app", function (require, exports, module) {

    var $ = require("jquery");
    var tasks = require("tasks");

    /* register event handlers */

    function _registerEventHandlers() {
        $("#new-task-button").on("click", tasks.add);
        $("#delete-all-button").on("click", tasks.clear);
        $("#save-button").on("click", tasks.save);
        $("#cancel-button").on("click", tasks.cancel);
        $("#task-list").on("click", ".delete-button", tasks.remove);
    }

    exports.init = function () {
        _registerEventHandlers();
        tasks.render();
    }

});

require(["app"], function (app) {
    /* initialize application */
    app.init()
});