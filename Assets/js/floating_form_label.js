/* Float Label Pattern Plugin for Bootstrap 3.1.0 by Travis Wilson
**************************************************/

(function ($) {
    $.fn.floatLabels = function (options) {

        // Settings
        var self = this;
        var settings = $.extend({}, options);


        // Event Handlers
        function registerEventHandlers() {
            self.on('input keyup change', 'input, textarea', function () {
                actions.swapLabels(this);
            });
        }


        // Actions
        var actions = {
            initialize: function() {
                self.each(function () {
                    var $this = $(this);
                    var $label = $this.children('label');
                    var $field = $this.find('input,textarea').first();

                    if ($this.children().first().is('label')) {
                        $this.children().first().remove();
                        $this.append($label);
                    }

                    var placeholderText = ($field.attr('placeholder') && $field.attr('placeholder') != $label.text()) ? $field.attr('placeholder') : $label.text();

                    $label.data('placeholder-text', placeholderText);
                    $label.data('original-text', $label.text());

                    if ($field.val() == '') {
                        $field.addClass('empty')
                    }
                });
            },
            swapLabels: function (field) {
                var $field = $(field);
                var $label = $(field).siblings('label').first();
                var isEmpty = Boolean($field.val());

                if (isEmpty) {
                    $field.removeClass('empty');
                    $label.text($label.data('original-text'));
                }
                else {
                    $field.addClass('empty');
                    $label.text($label.data('placeholder-text'));
                }
            }
        }


        // Initialization
        function init() {
            registerEventHandlers();

            actions.initialize();
            self.each(function () {
                actions.swapLabels($(this).find('input,textarea').first());
            });
        }
        init();


        return this;
    };

    $(function () {
        $('.float-label-control').floatLabels();
    });

    $(function() {
        var active = false,
            sorting = false;
        
        $( "#accordion" )
        .accordion({
            header: "> div > h3",
            collapsible: true,
            activate: function( event, ui){
                //this fixes any problems with sorting if panel was open (remove to see what I am talking about)
                if(sorting)
                    $(this).sortable("refresh");   
            }
        })
        .sortable({
            handle: "h3",
            placeholder: "ui-state-highlight",
            start: function( event, ui ){
                //change bool to true
                sorting=true;
                
                //find what tab is open, false if none
                active = $(this).accordion( "option", "active" ); 
                
                //possibly change animation here
                $(this).accordion( "option", "animate", { easing: 'swing', duration: 0 } );
                
                //close tab
                $(this).accordion({ active:false });
            },
            stop: function( event, ui ) {
                ui.item.children( "h3" ).triggerHandler( "focusout" );
                
                //possibly change animation here; { } is default value
                $(this).accordion( "option", "animate", { } );
                
                //open previously active panel
                $(this).accordion( "option", "active", active );
                
                //change bool to false
                sorting=false;
            }
        });
    });
})(jQuery);

