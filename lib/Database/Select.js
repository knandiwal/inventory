var Database = Database || {};

Database.Select = Class.create();

Database.Select.prototype.init = function(table, filter) {
    this.table    = table || '';
    this.offset   = 0;
    this.limit    = 18446744073709551615;
    this.order    = {};
    this.filter   = {conditions: '', data: []};

    var filter = filter || {};

    Helper.Validation.validateType(this.table,  'string', 'table');
    Helper.Validation.validateType(filter, 'object', 'filter');

    this.setFilter(filter);

    return this;
};

Database.Select.prototype.setTable = function(table) {
    this.table = table || '';

    Helper.Validation.validateType(this.table, 'string', 'table');

    return this;
};

Database.Select.prototype.setLimit = function(offset, limit) {
    var limit  = limit  || this.limit,
        offset = offset || this.offset;

    Helper.Validation.validateType(limit,  'number', 'limit');
    Helper.Validation.validateType(offset, 'number', 'offset');
    Helper.Validation.validateValue(limit,  function(value) { return value >= 0; }, 'limit', 'value higher than or equal to zero');
    Helper.Validation.validateValue(offset, function(value) { return value >= 0; }, 'offset', 'value higher than or equal to zero');

    this.limit  = limit;
    this.offset = offset;

    return this;
};

Database.Select.prototype.setOrder = function(order) {
    this.order = order || {};

    Helper.Validation.validateType(this.order, 'object', 'order');

    return this;
};

Database.Select.prototype.setFilter = function(filter) {
    var filter = filter || {};

    Helper.Validation.validateType(filter, 'object', 'filter');

    this.filter = this.parseConditions(filter);

    return this;
};

Database.Select.prototype.parseConditions = function(filter) {
    var conditions = [],
        data       = [];

    for(key in filter) {
        var value = filter[key];
        if (key.indexOf('|') !== -1) {
            var selector = key.split('|')[0]; // (.*)|.*
            var key = key.split('|').slice(1).join('|'); // .*|(.*)

            switch(selector) {
                case 'in':
                    if (!Array.isArray(value)) {
                        throw new IllegalArgumentException('Database.Select.setFilter: key "' + key + '" must have value of type Array.');
                    }

                    conditions.push('"' + key + '" IN(' + new Array(value.length+1).join('?').split('').join(',') + ')');
                    data = data.concat(value);

                    break;

                default:
                    throw new IllegalArgumentException('Database.Select.setFilter: key "' + key + '" has an invalid selector: "' + selector + '".');
            }
        } else {
            conditions.push('"' + key + '" = ?');
            data.push(value);
        }
    }

    return {conditions: conditions.join(' AND '), data: data};
};

Database.Select.prototype.formQuery = function() {
    Helper.Validation.validateType(this.table,    'string', 'table');
    Helper.Validation.validateType(this.offset,   'number', 'offset');
    Helper.Validation.validateType(this.limit,    'number', 'limit');
    Helper.Validation.validateType(this.order,    'object', 'order');
    Helper.Validation.validateType(this.filter,   'object', 'filter');

    Helper.Validation.validateType(this.filter.conditions, 'string', 'filter.conditions');
    Helper.Validation.validateType(this.filter.data,       'array',  'filter.data');

    Helper.Validation.validateValue(this.table,  function(value) { return value.length>0; }, 'table', 'value than zero');
    Helper.Validation.validateValue(this.offset, function(value) { return value >= 0; },     'offset', 'value higher than or equal to zero');
    Helper.Validation.validateValue(this.limit,  function(value) { return value > 0; },      'limit', 'value higher than zero');
    
    var query = 'SELECT * FROM ' + this.table;

    if (this.filter.conditions.length > 0) {
        query += ' WHERE ' + this.filter.conditions;
    }

    if (this.order.length > 0) {
        var order = [];
        for(field in this.order) {
            order.push('"' + field + '" ' + this.order[field]);
        }

        query += ' ORDER BY ' + order.join(',');
    }

    query += ' LIMIT ' + this.offset + ',' + this.limit;

    return new Database.Query(query, this.filter.data);
};