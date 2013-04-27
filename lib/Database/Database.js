var Database = Database || {};

Database.Database = Class.create();

Database.Database.prototype.init = function(name, size) {
    Helper.Validation.validateType(name, 'string', 'name');
    Helper.Validation.validateType(size, 'number', 'size');

    this.connection  = openDatabase(name, "1.0", name, Math.max(parseFloat(size), 0.1) * 1024 * 1024);
    this.definitions = {};
};

Database.Database.prototype.commit = function(transaction, failureCallback) {
    var failureCallback = failureCallback || function() {};

    Helper.Validation.validateInstanceOf(transaction, Database.Transaction, 'transaction', 'Database.Transaction');
    Helper.Validation.validateType(failureCallback, 'function', 'failureCallback');

    this.connection.transaction(function(db) {
        for (index in transaction.getQueries()) {
//            console.log(transaction.getQueries()[index].toArray());
            db.executeSql.apply(db, transaction.getQueries()[index].toArray());
        }
    }, failureCallback);
};

Database.Database.prototype.fetch = function(select) {
    Helper.validation.validateInstanceOf(select, Database.Select, 'select', 'Database.Select');

    var transaction = new Transaction();
    Transaction.select.apply(transaction, arguments);

    this.commit(transaction);
};