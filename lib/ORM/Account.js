var ORM = ORM || {};

ORM.Account = Class.extend(Database.Entity);

ORM.Account.prototype.init = function(phone_id) {
    this.parent.init.apply(this, arguments);

    this.phone_id = phone_id || null;
};