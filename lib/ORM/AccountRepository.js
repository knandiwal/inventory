var ORM = ORM || {};

ORM.AccountRepository = Class.extend(Database.Repository);

ORM.AccountRepository.prototype.init = function() {
    this.parent.init.apply(this, arguments);
    this.entityClass = ORM.Account;
    this.table       = 'accounts';

    this.persist();
};