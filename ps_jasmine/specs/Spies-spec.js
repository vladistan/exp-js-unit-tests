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

    it("Can verify params", function() {

        var spy = jasmine.createSpy('mine');

        spy(94);
        spy(2, 1);

        expect(spy).toHaveBeenCalledWith(94);
        expect(spy).toHaveBeenCalledWith(2, 1);
        expect(spy).not.toHaveBeenCalledWith(1, 2, 3);

    });

    it("Can use calls collection", function() {

        var myObj = { m1:  function() {}};
        var myObj2 = { m1:  function() {}};

        var spy = spyOn(myObj, 'm1');

        myObj.m1(1);
        myObj.m1(2,4);
        myObj.m1(3);


        expect(spy.calls.count()).toBe(3);
        expect(spy.calls.all()[0].args[0]).toBe(1);
        expect(spy.calls.all()[1].args[0]).toBe(2);
        expect(spy.calls.all()[1].args[1]).toBe(4);

        expect(spy.calls.all()[2].object).toBe(myObj);

    });

    it("Can reset spy", function() {

        var spy = jasmine.createSpy('mine');

        spy(94);
        spy(2, 1);

        expect(spy.calls.count()).toBe(2);
        expect(spy).toHaveBeenCalled();

        spy.calls.reset();

        expect(spy).not.toHaveBeenCalled();


    });


});