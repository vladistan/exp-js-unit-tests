describe("Sinon Spies", function () {

    it("Can spy on newly created functions", function () {

        var spy = sinon.spy();
        mySUT.callCallback(spy);
        expect(spy.called).toBeTruthy();

    });

    it("Can spy on newly created functions[ Sinon Assert]", function () {

        var spy = sinon.spy();
        mySUT.callCallback(spy);
        sinon.assert.called(spy);
        sinon.assert.callCount(spy, 1);
        expect(true).toBeTruthy();

    });

    it("Can handle callbacks that return values", function () {

        var spy = sinon.spy(realCallBack);
        var rv = mySUT.callCallbackWithRV(spy);
        expect(spy.called).toBeTruthy();
        expect(rv).toBe(4);

    });


    it("Can handle dependency calling with dep passing", function () {

        var spy = sinon.spy(myDep, 'cb');
        var rv = mySUT.callBetterDependency(myDep);

        expect(spy.called).toBeTruthy();
        expect(rv).toBe(10);

    });

    it("Can stub dependency calling with dep passing", function () {

        var stub = sinon.stub().returns(93);

        var rv = mySUT.callCallbackWithRV(stub);
        sinon.assert.called(stub);
        expect(rv).toBe(93);

    });

});

describe('Game Test', function () {

    it('should damage def if hit', function () {

        var combat = new Combat();
        var def = new sinon.stub(new Character());
        var atk = new sinon.stub(new Character());

        atk.damage = 5;
        atk.calculateHit.returns(true);

        combat.attack(atk, def);

        sinon.assert.called(def.takeDamage);

        expect(def.takeDamage.getCall(0).calledWith(5)).toBeTruthy();

    });

    it('should damage def with hit (mocks)', function () {

        var combat = new Combat();
        var def = new Character();
        var atk = new sinon.stub(new Character());

        atk.damage = 15;
        atk.calculateHit.returns(true);


        var mockDef = sinon.mock(def);

        var exp = mockDef.expects('takeDamage').once().withArgs(15);

        combat.attack(atk, def);

        exp.verify();

        expect(atk.calculateHit.called).toBeTruthy();

    });

});

describe('Matchers Explore', function () {

    it('Should work with matchers', function () {

        var spy = sinon.spy();

        spy('1234');
        sinon.assert.calledWithMatch(spy, sinon.match('234'));

        expect(1).toBeTruthy();

    });

    it('Should work with obj matchers', function () {

        var spy = sinon.spy();

        var o = {f: 19, n: 11};

        spy(o);

        sinon.assert.calledWithMatch(spy, sinon.match.same(o));
        sinon.assert.calledWithMatch(spy, sinon.match.has('f', 19));

        expect(1).toBeTruthy();

    });

});

describe('Handle XHRs', function () {

    var xhr, requests;

    beforeEach(function () {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];

        xhr.onCreate = function (rq) {
            requests.push(rq);
        };


    });

    afterEach(function () {
        xhr.restore();
    });

    it('Should be able to handle XHR Rqs', function () {

        var rspData = '"myData":3}';

        $.getJSON('some/url', function (data) {
            console.log(data);
        });

        requests[0].respond(200, {'Content-Type:': 'application/json'}, rspData);

        expect(requests[0].url).toBe('some/url');

    });

});


describe('Using FakeXHR server', function () {

    var server;

    beforeEach(function () {
        server = sinon.fakeServer.create();
        server.respondWith(['200', {'Content-Type:': 'application/json'}, '{"myProp":35}']);

    });

    afterEach(function () {
        server.restore();
    });

    it('Should respond with data', function () {

        var spy = sinon.spy();

        $.getJSON("some/url", spy);

        server.respond();

        sinon.assert.calledWith(spy, {myProp: 35});
        expect(spy.called).toBeTruthy();

    });


});


var myXHRWrap = {
    get: function () {
        console.log('--get function')
    },
    save: function () {
        console.log('--save function')
    }
};

describe('Sandbox', function () {

    afterEach(function () {
        console.log('Sandbox restored');

        myXHRWrap.get();
        myXHRWrap.save();

    });

    it('should be able to SandBox', function () {

        var sandBox = sinon.sandbox.create();

        console.log('in sandbox test');

        var stub = sandBox.stub(myXHRWrap);

        myXHRWrap.get();
        myXHRWrap.save();

        sinon.assert.calledOnce(stub.save);

        expect(1).toBeTruthy();

        sandBox.restore();

    });



});


