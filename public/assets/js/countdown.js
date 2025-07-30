(function($) {
  'use strict';
  /*-------------------------------------------------------------------------------
  Countdown
  -------------------------------------------------------------------------------*/
  $(".andro_countdown-timer").each(function() {
    console.log('hello world countdown timer!!!')
    var $this = $(this);
    $this.countdown($this.data('countdown'), function(event) {
      $(this).html(event.strftime('<span>%D <i>days</i></span> <span>%H <i>hrs</i></span> <span>%M <i>mins</i></span> <span>%S <i>sec</i></span>'));
    });
  });
})(jQuery);