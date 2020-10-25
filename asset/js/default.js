(function($) {
    function fixIframeAspect() {
        $('iframe').each(function () {
            var aspect = $(this).attr('height') / $(this).attr('width');
            $(this).height($(this).width() * aspect);
        });
    }

    function framerateCallback(callback) {
        var waiting = false;
        callback = callback.bind(this);
        return function () {
            if (!waiting) {
                waiting = true;
                window.requestAnimationFrame(function () {
                    callback();
                    waiting = false;
                });
            }
        }
    }

    $(document).ready(function() {
        $('#user-bar').addClass('fixed');
        
        $('header nav').addClass('closed');

        $('header nav').click(function() {
            $(this).toggleClass('open').toggleClass('closed');
        });

        // Maintain iframe aspect ratios
        $(window).on('load resize', framerateCallback(fixIframeAspect));
        fixIframeAspect();
        
        $('#grid').click(function() {
            var $grid = $('#grid-wrapper').imagesLoaded( function() {
                // init Masonry after all images have loaded
              $grid.masonry({
                itemSelector: ".resource", 
                columnWidth: ".grid-sizer", 
                horizontalOrder: true, 
                gutter: ".gutter", 
                percentPosition: true
              });
            }); 
        })
            

    });
})(jQuery);
