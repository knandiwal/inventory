var Renderer = Class.create();

Renderer.prototype.init = function() {
    this.templates = {};
};

Renderer.prototype.loadTemplates = function(templates, successHandler, errorHandler) {
    this.loading = templates.length;

    if (typeof successHandler !== 'function') {
        var successHandler = function() {};
    }

    if (typeof errorHandler !== 'function') {
        var errorHandler = function() {};
    }
    
    for(index in templates) {
        (function(name, self) {
            $.get(container.config.template_path + '/' + name + '.html')
            .done(function(template) {
                self.saveTemplate(name, template);
            })
            .fail(function() {
                self.errorHandler();
            });

        })(templates[index], this);
    }

    this.successHandler = successHandler;
    this.errorHandler   = errorHandler;
};

Renderer.prototype.saveTemplate = function(name, data) {
    this.templates[name] = data;
    this.loading--;

    if (this.loading < 1) {
        this.successHandler();
    }
};

Renderer.prototype.render = function(template_name, data) {
    var source = this.templates[template_name];
    var template = Handlebars.compile(source);

    return template(data);
};