var Navigator = Class.create();

Navigator.prototype.init = function() {
    this.viewport = {
        width : $(window).width(),
        height: $(window).height()
    };

    this.previous = null;
    this.current  = null;
    this.animationDuration = container.config.animationDuration;
    this.previousOffsets   = {};

    $('.body').css('width', this.viewport.width + 'px');
    $('.viewport').css('width', this.viewport.width + 'px');
    $('.preload').css({
        marginLeft: this.viewport.width + 'px'
    });
};

Navigator.prototype.preload = function(view) {
    this.previous = this.current;
    this.current  = view.name;
    
    $('.preload').html(view.data);
};

Navigator.prototype.switchToPreloaded = function(direction, callback) {
    this.previousOffsets[this.previous] = $(window).scrollTop();

    var offset = (direction === 'left' ? (this.previousOffsets[this.current] || 0) : 0);

    if (typeof direction === 'string' && (direction === 'left' || direction === 'right')) {
        var appDestination  = (direction === 'right') ? -this.viewport.width :  this.viewport.width;
        var preloadLocation = (direction === 'right') ?  this.viewport.width : -this.viewport.width;

        $('.preload')
            .css({display: 'block', marginLeft: preloadLocation + 'px', marginTop: $(window).scrollTop() + offset + 'px'})
            .animate({marginLeft: '0px'}, this.animationDuration);

        $('.preload').css({marginTop: ( -offset + $(window).scrollTop() ) + 'px'});
        
        $('.app').animate({marginLeft: appDestination + 'px'}, this.animationDuration, undefined, function() {
            $('.preload').removeClass('preload').addClass('app');
            $(this).addClass('preload').removeClass('app').html('').hide();
//            $('.app').html($('.preload').html());
            $('.app').css({marginLeft: '0px', marginTop: '0px'});
            $(window).scrollTop(offset);
//            $('.preload').css({marginLeft: container.navigator.viewport.width + 'px', display: 'none'});
//            $('.preload').html('');

            if (typeof callback === 'function') {
                callback();
            }
        });
    } else {
        $('.app').html($('.preload').html());

        if (typeof callback === 'function') {
            callback();
        }
    }
};