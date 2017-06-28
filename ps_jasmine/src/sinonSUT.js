var mySUT = {

    callCallback: function(cb) {
        cb();
    },

    callCallbackWithRV: function(cb) {
        return cb();
    },

    callDependency: function() {
        return myDep.cb();
    },

    callBetterDependency: function(dep) {
        return dep.cb();
    }

};


function realCallBack() {
    return 4;
}

var myDep = {
    cb: function() {
        return 10;
    }
};


var Combat = function() {};
Combat.prototype.attack = function(atk, def) {

    if(atk.calculateHit(def)) {
        def.takeDamage(atk.damage);
    }

};

var Character = function() {};
Character.prototype.calculateHit = function () {};
Character.prototype.takeDamage = function () {};