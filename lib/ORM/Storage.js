var Storage = Class.create();

Storage.prototype.init = function(name) {
    this.name = name || '';
    this.id   = new GUID();
};