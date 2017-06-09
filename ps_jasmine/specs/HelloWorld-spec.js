describe('MyClass', function () {

    it('should be true', function () {
        expect(true).toBeTruthy();
    });
});


describe('Calculator', function () {

    var calc;
    var outputId = '#calc-fixture';

    beforeEach(function () {
        calc = new Calculator($(outputId));

        jasmine.addMatchers({
            toBeCloseToOneThird: function (util, customTesters) {
                return {
                    compare: function (actual) {
                        var passed = (actual >= 0.333 && actual <= 0.334);
                        return {
                            pass: passed,
                            message: 'Expected ' + actual + ' to be close ' +
                                     'to 1/3, but it differs by ' +
                                      (actual - 1.0/3.0)
                        };
                    }
                };
            }
        });

    });

    it('should be able to add 1 and 1', function () {

        expect(calc.add(1, 1)).toBe(2);
    });

    it('should be able to add 8 and 4', function () {

        expect(calc.add(8, 4)).toBe(12);
    });


    it('should be able to divide 6 and 2', function () {

        expect(calc.divide(6, 2)).toBe(3);

    });

    it('should be able to divide 1 and 3', function () {

        expect(calc.divide(1, 3)).toBeCloseToOneThird();

    });

});