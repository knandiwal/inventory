var GUID = Class.create();

GUID.prototype.init = function() {
    this.value = this.s4() + '' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
                 this.s4() + '-' + this.s4() + '' + this.s4() + '' + this.s4();
};

GUID.prototype.s4 = function() {
  return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};