var Container = Class.create();

Container.prototype.init = function() {
    this.__dependencies = {};
    this.__initialized = {};
};

Container.prototype.get = function(dependency) {
    if (typeof this.__initialized[dependency] !== 'undefined') {
        return this.__initialized[dependency];
    } else {
        if (typeof this.__dependencies[dependency] !== 'undefined') {
            this.__initialized[dependency] = this.__dependencies[dependency]();
            return this.__initialized[dependency];
        } else {
            throw new RuntimeException('Missing dependency: ' + dependency);
        }
    }
};

Container.prototype.register = function(dependency, object) {
    var self = this;

    if (typeof object === 'function') {
        this.__dependencies[dependency] = object;
    } else {
        this.__initialized[dependency] = object;
    }

    Object.defineProperty(this, dependency, {
        get: function() { return self.get.call(self, dependency); }
    });
};