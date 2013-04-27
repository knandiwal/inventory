var Account = Class.create();

Account.prototype.init = function() {
    this.storages = {};
    this.id       = new GUID();
};

Account.prototype.extractSession = function() {
    var storages = container.session.get('storages') || {};

    for(index in storages) {
        var storage = new Storage();
        for(key in storages[index]) {
            storage[key] = storages[index][key];
        }

        this.storages[storage.id] = storage;
    }

    if (this.storages.length === 0) {
        var store = new Storage('Home');
        this.storages[store.id] = store;
    }
};