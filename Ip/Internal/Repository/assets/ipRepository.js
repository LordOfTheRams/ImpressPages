// defining global variables
var ipRepository;
var ipRepositoryESC;

(function($){
    "use strict";

    ipRepository = function (options) {
        if ($('.ipModuleRepositoryPopup').length) {
            return; //repository window is already open. Do nothing.
        }

        // define options defaults
        options.preview = options.preview || 'list';
        options.filter = options.filter || null;


        $('body').append(ipRepositoryHtml);
        var $popup = $('.ipModuleRepositoryPopup');
        $popup.css('position', 'fixed');
        $popup.css('top', 0);
        $popup.css('left', 0);


        //initialize first tab
        $popup.find('#ipModuleRepositoryTabUpload').ipRepositoryUploader();
        $popup.find('#ipModuleRepositoryTabUpload').ipRepositoryAll(options);


        //initialize other tabs on first use
        $popup.find('.tabs').tabs({
            activate: function( event, ui ) {
                var tabHref = ui.newTab.find('a').attr('href');
                switch(tabHref) {
                    case '#ipModuleRepositoryTabAll':
                        $popup.find('#ipModuleRepositoryTabAll').ipRepositoryAll();
                        break;
                    case '#ipModuleRepositoryTabBuy':
                        $popup.find('#ipModuleRepositoryTabBuy').ipRepositoryBuy();
                        break;
                }
            }
        });


        $popup.bind('ipModuleRepository.confirm', function(e, files) {
            $(this).trigger('ipRepository.filesSelected', [files]);
            $(this).trigger('ipModuleRepository.close');
        });

        $popup.bind('ipModuleRepository.cancel', function(e) {
            $(this).trigger('ipModuleRepository.close');
        });

        $popup.bind('ipModuleRepository.close', function(e) {
            $(document).off('keyup', ipRepositoryESC);
            $('.ipModuleRepositoryPopup').remove();
            $('body').removeClass('stopScrolling');
        });

        $popup.find('.ipsClose').hover(function(){$(this).addClass('ui-state-hover');}, function(){$(this).removeClass('ui-state-hover');});

        $popup.find('.ipsClose').click(function(e){$(this).trigger('ipModuleRepository.cancel');  e.preventDefault();});

        $(document).on('keyup', ipRepositoryESC);

        $('body').addClass('stopScrolling');

        //$popup.bind('dialogclose', function(){$('.ipModuleRepositoryPopup').remove(); $('body').removeClass('stopScrolling')});

        return $popup;

        function browserPopupHtmlResponse(response) {
        }
    };


    ipRepositoryESC = function(e) {
        var $popup = $('.ipModuleRepositoryPopup');
        if (e.keyCode == 27) {
            $popup.trigger('ipModuleRepository.cancel');
        }
    };

})(ip.jQuery);