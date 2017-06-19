define(["jquery", "hbs!templates/logEntry"], function ($, logTemplate) {
    "use strict";


    function renderNew(msg) {
        var log = $("#log-list");
        log.prepend(_renderEntry(msg));
    }

    function _renderEntry(msg) {
        var logEntry = $(logTemplate({message: msg}));
        return logEntry;
    }

    function addMessage(msg) {
        console.log(msg);
        renderNew(msg);

    }

    return {
        addMessage: addMessage
    };

});
