QUnit.module('module 1');
QUnit.test('my first test', function () {
    QUnit.assert.strictEqual(5, 5)
});

QUnit.module('module 2', {
    setup: function() {

    },
    teardown: function() {

    }
});
QUnit.test('my second test', function () {
    QUnit.assert.strictEqual(3, 3);
});

QUnit.test('testing DOM', function () {

    SUT.createTodoItem();
    QUnit.assert.strictEqual($(".js-todoContainer").length, 1)
});
