var Database = Database || {};

Database.Transaction = Class.create();

Database.Transaction.prototype.init = function() {
    this.queries = [];
};

Database.Transaction.prototype.execute = function(query) {
    Helper.Validation.validateInstanceOf(query, Database.Query, 'query', 'Database.Query');

    this.queries.push(query);
};

Database.Transaction.prototype.insert = function(table, data, successCallback, failureCallback) {
    var successCallback = successCallback || function() {},
        failureCallback = failureCallback || function() {};

    Helper.Validation.validateType(table,           'string',   'table');
    Helper.Validation.validateType(data,            'object',   'data');
    Helper.Validation.validateType(successCallback, 'function', 'successCallback');
    Helper.Validation.validateType(failureCallback, 'function', 'failureCallback');

    Helper.Validation.validateValue(table, function(value) { return value.length > 0; }, 'table', 'value longer than zero');

    var query = 'INSERT INTO ' + table;
    var fields = [];
    var values = [];

    for(key in data) {
        if (typeof data[key] === 'string' || typeof data[key] === 'number') {
            fields.push(key);
            values.push(data[key]);
        }
    }

    if (values.length === 0) {
        throw new Exception('Database.Transaction.insert expecting argument "data" length higher than zero.');
    }
    query += '("' + fields.join('","') + '") VALUES(' + new Array(values.length+1).join('?').split('').join(',') + ')';

    this.execute(new Database.Query(query, values, successCallback, failureCallback));
};

Database.Transaction.prototype.replace = function(table, data, successCallback, failureCallback) {
    var successCallback = successCallback || function() {},
        failureCallback = failureCallback || function() {};

    Helper.Validation.validateType(table,           'string',   'table');
    Helper.Validation.validateType(data,            'object',   'data');
    Helper.Validation.validateType(successCallback, 'function', 'successCallback');
    Helper.Validation.validateType(failureCallback, 'function', 'failureCallback');

    Helper.Validation.validateValue(table, function(value) { return value.length > 0; }, 'table', 'value longer than zero');
    Helper.Validation.validateValue(data,  function(value) { return value.length > 0; }, 'table', 'array size higher than zero');

    var query = 'REPLACE INTO ' + table;
    var fields = [];
    var values = [];

    for(key in data) {
        if (typeof data[key] === 'string' || typeof data[key] === 'number') {
            fields.push(key);
            values.push(data[key]);
        }
    }

    query += '("' + fields.join('","') + '") VALUES(' + new Array(values.length+1).join('?').split('').join(',') + ')';

    this.execute(new Database.Query(query, values, successCallback, failureCallback));
};

Database.Transaction.prototype.update = function(table, data, conditions, successCallback, failureCallback) {
    var successCallback = successCallback || function() {},
        failureCallback = failureCallback || function() {},
        conditions      = conditions      || {};

    Helper.Validation.validateType(table,           'string',   'table');
    Helper.Validation.validateType(data,            'object',   'data');
    Helper.Validation.validateType(conditions,      'object',   'conditions');
    Helper.Validation.validateType(successCallback, 'function', 'successCallback');
    Helper.Validation.validateType(failureCallback, 'function', 'failureCallback');

    Helper.Validation.validateValue(table, function(value) { return value.length > 0; }, 'table', 'value longer than zero');

    var conditions = Database.Select.prototype.parseConditions.call(null, conditions);
    var query      = 'UPDATE ' + table + ' SET ';
    var updates    = [];
    var values     = [];

    for(key in data) {
        if (typeof data[key] === 'string' || typeof data[key] === 'number') {
            fields.push(key);
            values.push(data[key]);
        }
    }

    query += updates.join(', ');
    if (conditions.conditions.length > 0) {
        query += ' WHERE ' + conditions.conditions;
        values = values.concat(conditions.data);
    }

    this.execute(new Database.Query(query, values, successCallback, failureCallback));
};

Database.Transaction.prototype.select = function(select) {
    Helper.Validation.validateInstanceOf(select, Database.Select, 'select', 'Database.Select');

    this.execute(select.formQuery());
};

Database.Transaction.prototype.getQueries = function() {
    return this.queries;
};