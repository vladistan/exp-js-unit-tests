/* create DOM task elements */

require.config({
    paths: {
        jquery: 'jquery-2.1.1.min'
    }
});


require(["app"], function (app) {
    /* initialize application */
    app.init();
});