describe('Running tests', function() {

    it("Should run simple tests", function() {

        expect(1).toBeTruthy();
    });

    it("Should be lint free", function() {

        var x = 3;
        if ( x == 3 ) {
            x = 9;
        }

        expect(x).toBe(9);

    });

});