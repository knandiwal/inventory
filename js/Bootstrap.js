var Bootstrap = Class.create();

Bootstrap.prototype.init = function() {
    var self = this;

    document.addEventListener('deviceready', function() { self.start.call(); }, false);
};

Bootstrap.prototype.start = function() {
    this.app = new App();
};