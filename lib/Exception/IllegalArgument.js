var IllegalArgumentException = Class.create();

IllegalArgumentException.prototype = new Error();

IllegalArgumentException.prototype.init = function(message) {
    this.name = 'IllegalArgumentException';
    this.message = message || 'an error occured.';
};