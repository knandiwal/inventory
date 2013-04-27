var RuntimeException = Class.create();

RuntimeException.prototype = new Error();

RuntimeException.prototype.init = function(message) {
    this.name = 'RuntimeException';
    this.message = message || 'an error occured.';
};