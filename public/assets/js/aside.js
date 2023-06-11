(function($) {
  'use strict';

  /*-------------------------------------------------------------------------------
  Burger Menu Expand
	-------------------------------------------------------------------------------*/
  $(".mobile-trigger").on('click', function() {
    $('body').toggleClass('andro_aside-open');

    setTimeout(function() {
      $(".andro_aside nav > ul > li").each(function(i) {
        $(this).delay(200 * i).fadeIn(500);
      });
      $('.andro_aside-notice').delay(800).fadeIn(500);
    }, 500);
  });

  /*-------------------------------------------------------------------------------
  Mobile Menu Submenus
  -------------------------------------------------------------------------------*/
  $(".andro_aside .has-children > a").on('click', function(e) {
    var submenu = $(this).next("ul");
    e.preventDefault();

    submenu.slideToggle(200);
  });

  /*-------------------------------------------------------------------------------
  Header search form
  -------------------------------------------------------------------------------*/
  $('.search-trigger').on('click', function() {
    $(".andro_header-search").toggleClass('open');
  });

})(jQuery);
