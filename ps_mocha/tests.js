var expect = chai.expect;

//mocha.setup({timeout: 3000})

describe('my suite', function () {

    before(function () {
        console.log("Setup");
    });

    after(function () {
        console.log("Tear down");
    });

    beforeEach(function () {
        console.log("Before");
    });

    afterEach(function () {
        console.log("After");
    });

    it('test 1', function () {
        console.log("Test 1");
        expect(1).to.equal(1);
    });

    it('test 2', function () {
        console.log("Test 2");
        expect(2).to.equal(2);
    });

    describe('inner suite I', function () {

        beforeEach(function () {
            console.log("Before: I");
        });

        afterEach(function () {
            console.log("After: I");
        });

        it("Test I1", function () {
            console.log("Test I1");
            expect(3).to.equal(3);
        });

        it("Test I2 (Async)", function (done) {

            this.timeout(5000);
            var bob = 9;
            setTimeout(function () {
                bob = 11;

            }, 2000);

            setTimeout(function () {
                expect(bob).to.equal(11);
                done();
            }, 2100);

        });

    });

    describe('inner suite X', function () {

        before(function () {
            console.log("Setup: X");
        });


        beforeEach(function () {
            console.log("Before: X");
        });

        afterEach(function () {
            console.log("After: X");
        });

        it("Test I1", function (done) {
            console.log("Test X1");
            expect(3).to.equal(3);
            setTimeout(function () {
                done();
            }, 500);
        })

    });


});