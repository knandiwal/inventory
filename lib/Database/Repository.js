var Database = Database || {};

Database.Repository = Class.create();

Database.Repository.prototype.init = function(instance) {
    this.db          = instance;
    this.table       = '';
    this.entityClass = function(){};
};


Database.Repository.prototype.persist = function(successCallback, failureCallback) {
    var successCallback = successCallback || function() {},
        failureCallback = failureCallback || function() {};

    Helper.Validation.validateType(successCallback, 'function', 'successCallback');
    Helper.Validation.validateType(failureCallback, 'function', 'failureCallback');
    Helper.Validation.validateType(this.table, 'string', 'table');
    Helper.Validation.validateValue(this.table, function(value) { return value.length > 0; }, 'table', 'value longer than zero.');
    Helper.Validation.validateInstanceOf(new this.entityClass, Database.Entity, 'entityClass', 'Database.Entity');

    var t      = new Database.Transaction;
    var query  = 'CREATE TABLE IF NOT EXISTS "' + this.table + '"';
    var fields = ['"id" unique'];

    Object.keys(new this.entityClass).forEach(function(key) {
        if (key !== 'id') {
            fields.push('"' + key + '"');
        }
    });

    query += ' (' + fields.join(', ') + ')';

    t.execute(new Database.Query(query), {}, successCallback, failureCallback);
    
    this.db.commit(t);
};

Database.Repository.prototype.get = function(filter, order, offset, limit) {
    var t = new Database.Transaction;
};

Database.Repository.prototype.save = function(entity, successCallback, failureCallback) {
    var successCallback = successCallback || function() {},
        failureCallback = failureCallback || function() {};

    Helper.Validation.validateType(successCallback, 'function', 'successCallback');
    Helper.Validation.validateType(failureCallback, 'function', 'failureCallback');
    Helper.Validation.validateInstanceOf(entity, this.entityClass, 'entity', 'Database.Entity');

    if (entity.id === null) {
        console.log("CREATING RECORD.");
        entity.id = new GUID().value;
        var t = new Database.Transaction();
        t.insert(this.table, entity, successCallback, failureCallback);
        this.db.commit(t);
    } else {
        console.log("UPDATING RECORD");
        var t = new Database.Transaction();
        t.update(this.table, entity, {id: entity.id}, successCallback, failureCallback);
        this.db.commit(t);
    }
};