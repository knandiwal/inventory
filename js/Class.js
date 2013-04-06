var Class = {
    /**
     * Creates a new class instance.
     *
     * @private
     * @returns {object}
     */
    create: function() {
        var _class = function() {
            if (typeof this.init !== 'undefined') {
                this.init.apply(this, arguments);
            }
        };

        _class.prototype = {
            constructor: _class,
            parent: null
        };

        return _class;
    },

    /**
     * Extends existing class. Pass properties to extend the prototype.
     *
     * @private
     * @param {object} parent
     * @param {object} properties
     * @returns {object}
     */
    extend: function(parent, propertiesObject) {
        var _child = Class.create();
        var _properties = {};

        if (typeof propertiesObject === 'object') {
            Object.keys(propertiesObject).forEach(function(key) {
                _properties[key] = { value: propertiesObject[key] };
            });
        }

        _child.prototype        = Object.create(parent.prototype, _properties);
        _child.prototype.parent = parent.prototype;

        Object.keys(parent).forEach(function(key) {
            _child[key] = parent[key];
        });

        return _child;
    }
};