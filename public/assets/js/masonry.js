(function($) {
  'use strict';

  /*-------------------------------------------------------------------------------
  Magnific Popup
  -------------------------------------------------------------------------------*/
  $('.andro_img-popup').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });
  $('.andro_img-gallery').each(function() {
    $(this).magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  });

  /*-------------------------------------------------------------------------------
  Masonry
  -------------------------------------------------------------------------------*/
  $('.andro_masonry').imagesLoaded(function() {
    var isotopeContainer = $('.andro_masonry');
    isotopeContainer.isotope({itemSelector: '.andro_masonry-item'});
  });

})(jQuery);
