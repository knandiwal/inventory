var Session = Class.create();

Session.prototype.init = function(name) {
    var self = this;

    Object.defineProperty(this, '__name', {
        value: name || 'default',
        writable: false
    });

    this.__storage = {};

    for(key in localStorage.getItem(this.__name) || {}) {
        var value = JSON.parse(this.__storage[key]);
        this.__storage[key] = value;
    }
};

Session.prototype.set = function(key, value) {
    this.__storage[key] = value;
    this.save();
};

Session.prototype.get = function(key) {
    return this.__storage[key];
};

Session.prototype.save = function() {
    var data = {};
    for(key in this.__storage) {
        data[key] = JSON.stringify(this.__storage[key]);
    }

    localStorage.setItem(this.__name, data);
};