var View = Class.create();

View.prototype.init = function(name, data) {
    this.name = name;
    this.data = data || '';
};

View.prototype.setData = function(data) {
    this.data = data || '';
};