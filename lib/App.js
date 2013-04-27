var App = Class.create();


App.prototype.init = function() {
    var repo = new ORM.AccountRepository(container.get('database'));
    console.log(repo);

    repo.save(new ORM.Account(device.uuid));








    try {
//        console.log(new Database.Select('test').setLimit(0,1).setFilter({
//            'in|id': [1,2,3,4,5],
//            'test': 'abc'
//        }).formQuery());
//        t.update('test', {
//            name: 'test data updated!'
//        }, {id: 1}, function() { console.log(arguments);}, function() { console.log(arguments);})
//        var q = new Database.Query('DROP TABLE test');
        
//        t.execute(q);
//        t.execute(new Database.Query('CREATE TABLE test(id unique, name)', [], function(transaction, resultset) {
//            console.log('Transaction:');
//            console.log(transaction);
//            console.log('Results:');
//            console.log(resultset);
//        }, function(t, error) {
//            console.log(error);
//        }));
//        t.execute(new Database.Query('INSERT INTO test VALUES(' + new Date().getTime() + ', "a")', [], function(t, r) {
//            console.log('Insert:');
//            console.log(r);
//        }, function(t, e) {
//            console.log(e);
//        }));
//
//        db.commit(t);
//
//        var t = new Database.Transaction();
//        t.execute(new Database.Query('SELECT * FROM test', [], function(t, r) {
//            alert(r.rows.length);
//        }));
    } catch(e) {
        console.log(e.message);
        console.log(e.stack);
    }
    
//    navigator.notification.alert(
//        'Cordova is ready!',       // message
//        function() {},           // callback
//        'Congratulations',            // title
//        'Done'                      // buttonName
//    );
    $('#scan').click(function() {
        alert('Trying');
        var bs = cordova.require("cordova/plugin/barcodeScanner");
        bs.scan(
            function(res) {
                alert('scanned');
                alert(res);
            },
            function(error) {
                alert("scanning failed!: " + error);
            }
        );
    });

    this.display('storage_list');
};

App.prototype.display = function(view, direction, options) {
    switch(view) {
        case 'storage_list':
            container.navigator.preload(this.getStorageList(options));
            break;
        case 'storage_view':
            container.navigator.preload(this.getStorageView(options));
            break;
        case 'storage_item':
            container.navigator.preload(this.getStorageItem(options));
            break;
    }

    container.navigator.switchToPreloaded(direction);
};

App.prototype.getStorageList = function(options) {
    var data = {
        storages: [
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'}, {name: 'storage 1storage 1storage 1'},
            {name: 'storage 1'},
            {name: 'storage 2'}
        ]
    };

    return new View('storage_list', container.renderer.render('storage_list', data));
};

App.prototype.getStorageView = function(options) {
    return new View('storage_view', container.renderer.render('storage_view', {}));
};

App.prototype.getStorageItem = function(options) {
    return new View('storage_item', container.renderer.render('storage_item', {}));
};