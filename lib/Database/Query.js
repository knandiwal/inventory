var Database = Database || {};

Database.Query = Class.create();

Database.Query.prototype.init = function(statement, data, successCallback, failureCallback) {
    var data            = data || [],
        successCallback = successCallback || function() {},
        failureCallback = failureCallback || function() {};

    Helper.Validation.validateType(statement, 'string', 'statement');
    Helper.Validation.validateType(data, 'array', 'data');
    Helper.Validation.validateType(successCallback, 'function', 'successCallback');
    Helper.Validation.validateType(failureCallback, 'function', 'failureCallback');

    this.statement       = statement;
    this.data            = data;
    this.successCallback = successCallback;
    this.failureCallback = failureCallback;
};

Database.Query.prototype.setSuccessCallback = function(successCallback) {
    var successCallback = successCallback || function() {};

    Helper.Validation.validateType(successCallback, 'function', 'successCallback');

    this.successCallback = successCallback;
};

Database.Query.prototype.setFailureCallback = function(failureCallback) {
    var failureCallback = failureCallback || function() {};

    Helper.Validation.validateType(failureCallback, 'function', 'failureCallback');

    this.failureCallback = failureCallback;
};

Database.Query.prototype.toArray = function() {
    return [this.statement, this.data, this.successCallback, this.failureCallback];
};