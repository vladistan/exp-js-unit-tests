describe("Function Spies", function() {

    it("Can spy on newly created functions", function() {
        var spyCB = jasmine.createSpy('mySpy');

        cbConsumer(spyCB);

        expect(spyCB).toHaveBeenCalled();
    });

    it("Can spy on existing methods", function() {

        var spy = spyOn(myObj, 'save');

        myObj.save();

        expect(spy).toHaveBeenCalled();

    });

    it("Can spies on methods that return things", function() {

        var spy = spyOn(myObj, 'getQty').and.returnValue(9);

        expect(myObj.getQty()).toBe(9);

        expect(spy).toHaveBeenCalled();

    });

    it("Can spies on methods and use own impl", function() {

        var spy = spyOn(myObj, 'getQty').and.callFake( function() {
                console.log("Fake impl");
                return 43;
            }
        );

        expect(myObj.getQty()).toBe(43);

        expect(spy).toHaveBeenCalled();

    });

});

describe('Obj Spies', function() {

    it("Can spy on completely fake obj", function() {

        var tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

        tape.play.and.returnValue(4);
        tape.rewind.and.callFake(function(a,b) {
            return a+b;
        });

        var pl = tape.play(104);
        var ps = tape.pause(115);
        var rwd = tape.rewind(8, 3);


        expect(tape.play).toHaveBeenCalled();
        expect(tape.pause).not.toHaveBeenCalledWith(113);
        expect(tape.pause).toHaveBeenCalledWith(115);
        expect(tape.rewind).toHaveBeenCalled();
        expect(tape.stop).not.toHaveBeenCalled();

        expect(pl).toBe(4);
        expect(rwd).toBe(11);

    });
});