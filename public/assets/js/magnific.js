(function($) {
  'use strict';

  /*-------------------------------------------------------------------------------
  Magnific Popup
  -------------------------------------------------------------------------------*/
  console.log(window.location);
  $('.andro_video-popup').magnificPopup({
    type: 'iframe',
    // Custom options provided to customize origin query param for YouTube
    iframe: {
      markup: '<div class="mfp-iframe-scaler">'+
        '<div class="mfp-close"></div>'+
        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
        '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: 'v=',
          src: 'https://www.youtube.com/embed/%id%?autoplay=1&origin=' + window.location.origin // URL that will be set as a source for iframe.
        },
        vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: 'https://player.vimeo.com/video/%id%?autoplay=1'
        }
      },
      srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
    }
  });
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

})(jQuery);
