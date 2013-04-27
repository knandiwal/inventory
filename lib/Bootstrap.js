var Bootstrap = Class.create();

Bootstrap.prototype.init = function() {
    var self = this;

    document.addEventListener('deviceready', function() { self.start.apply(self, arguments); }, false);
};

Bootstrap.prototype.start = function() {
    var self = this;
    
    container = new Container();
    container.register('config',    config);
//    container.register('session',   new Session());
    container.register('database',  new Database.Database(config.websql.database, config.websql.size));
    container.register('navigator', new Navigator());
    container.register('renderer',  new Renderer());

    container.renderer.loadTemplates(config.templates, function() { self.whenTemplatesLoaded(); });
};

Bootstrap.prototype.whenTemplatesLoaded = function() {
    app = new App();
};