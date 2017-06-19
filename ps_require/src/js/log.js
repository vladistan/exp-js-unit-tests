define(["renderers/logModule"], function (logModule) {

    "use strict;"


    /* task management */

    function addMessage(msg) {
        logModule.addMessage(msg);
    }


    return {
        addMessage: addMessage
    };


});
