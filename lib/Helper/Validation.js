var Helper = Helper || {};

Helper.Validation = {};

Helper.Validation.validateType = function(argument, type, argumentName) {
    if (typeof argument !== type && !(Array.isArray(argument) && type === 'array')) {
        var caller = getCaller(1);
        throw new IllegalArgumentException(
            'Illegal <' + caller.method + '> argument "' + argumentName + '". Expecting ' + type + '. ' +
            'At: ' + caller.class + ' Line: ' + caller.line);
    }
};

Helper.Validation.validateInstanceOf = function(argument, instance, argumentName, instanceName) {
    if (!(argument instanceof instance)) {
        var caller = getCaller(1);
        throw new IllegalArgumentException(
            'Illegal <' + caller.method + '> argument "' + argumentName + '". Expecting instance of ' + instanceName + '. ' +
            'At: ' + caller.class + ' Line: ' + caller.line);
    }
};

Helper.Validation.validateValue = function(argument, validator, argumentName, expectance) {
    var expectance = 'Expecting: ' + expectance + '. ' || '';
    if (validator.call(null, argument) !== true) {
        var caller = getCaller(1);
        throw new IllegalArgumentException(
            'Illegal <' + caller.method + '> argument "' + argumentName + '". ' + expectance +
            'At: ' + caller.class + ' Line: ' + caller.line);
    }
};

var getCaller = function(level) {
    var level = Math.max(0, parseInt(level)) || 0;
    level+=4;

    var callerString = (function(level) { try{ throw Error(''); } catch(e) { return e.stack.split('\n')[level]; } })(level);
    var caller = (/^.*at (.*) \(.*\/lib\/([A-Za-z0-9\/_ -]*\.js):([0-9]*):([0-9]*)\)$/).exec(callerString);

    if (caller === null) {
        return {};
    }

    caller = caller.slice(1);

    return result =  {
        method: caller.shift(),
        class: caller.shift(),
        line: parseInt(caller.shift()),
        char: parseInt(caller.shift())
    };
};