var Calculator = function (displayElement) {

    this.el = displayElement;
    this.$el = $(displayElement);


};

Calculator.prototype.hide_result = function (cb) {

    this.$el.fadeOut(1000, cb);

};

Calculator.prototype.divide = function(a, b) {
    $(this.el).html(a/b);

};

Calculator.prototype.add = function (a, b) {

    $(this.el).html(a + b);

};

Calculator.prototype.divide = function (a, b) {
    $(this.el).html(a / b);
};