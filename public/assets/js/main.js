(function($) {
  'use strict';

  /*-------------------------------------------------------------------------------
  Parallax effect on scroll
  -------------------------------------------------------------------------------*/
  function doParallaxScrollEffect() {
    var $parallaxElement = $(".andro_parallax-scroll");

    window.requestAnimationFrame(function() {
      for (var i = 0; i < $parallaxElement.length; i++) {
        var currentElement = $parallaxElement.eq(i),
          parallaxDirection = currentElement.hasClass('andro_parallax-scroll-down')
            ? 'down'
            : 'up',
          velocity = parallaxDirection == 'down'
            ? 0.1
            : -0.1,
          windowTop = $(window).scrollTop(),
          elementTop = currentElement.offset().top,
          elementHeight = currentElement.height(),
          viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
          scrolled = parallaxDirection == 'down'
            ? windowTop - elementTop
            : windowTop - elementTop + viewPortHeight;

        currentElement.css({
          transform: "translate3d(0," + scrolled * velocity + "px, 0)"
        });
      }
    });
  }

  /*-------------------------------------------------------------------------------
  Nice Scroll
	-------------------------------------------------------------------------------*/
  $(".nice-scroll").niceScroll({autohidemode: true, cursorcolor: '#efefef'});

  /*-------------------------------------------------------------------------------
  Init Tooltips (Bootstrap 5)
	-------------------------------------------------------------------------------*/
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });

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

  /*-------------------------------------------------------------------------------
  Masonry
  -------------------------------------------------------------------------------*/
  $('.andro_masonry').imagesLoaded(function() {
    var isotopeContainer = $('.andro_masonry');
    isotopeContainer.isotope({itemSelector: '.andro_masonry-item'});
  });

  /*------------------------------------------------------------------------------
  Isotope
  ------------------------------------------------------------------------------*/
  function doIsotope(){
    var $isotopeGrid = $(".andro_isotope-filter");

    $isotopeGrid.isotope({
      itemSelector: '.andro_isotope-item',
      layoutMode: 'fitRows',
    });

    $('.andro_isotope-filter-nav').on('click', '.andro_isotope-trigger', function() {
      var filterValue = $(this).attr('data-filter');
      $isotopeGrid.isotope({
        filter: filterValue
      });
    });

    $('.andro_isotope-trigger').on('click', function(e) {
        $(this).closest('.andro_isotope-filter-nav').find('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

  }
  doIsotope();

  /*-------------------------------------------------------------------------------
  Particles
  -------------------------------------------------------------------------------*/
  let particlesData = {
    "particles": {
      "number": {
        "value": 20,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 4,
          "size_min": 0.3,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0.7,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 600
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 250,
          "size": 0,
          "duration": 2,
          "opacity": 0,
          "speed": 3
        },
        "repulse": {
          "distance": 400,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };
  if($("#andro_particles").length){
    particlesJS('andro_particles', particlesData);
  }

  /*-------------------------------------------------------------------------------
  Date Picker
  -------------------------------------------------------------------------------*/
  $('.andro_datepicker').datepicker();

  /*-------------------------------------------------------------------------------
  Countdown
  -------------------------------------------------------------------------------*/
  $(".andro_countdown-timer").each(function() {
    var $this = $(this);
    $this.countdown($this.data('countdown'), function(event) {
      $(this).html(event.strftime('<span>%D <i>days</i></span> <span>%H <i>hrs</i></span> <span>%M <i>mins</i></span> <span>%S <i>sec</i></span>'));
    });
  });

  /*-------------------------------------------------------------------------------
  Countup
  -------------------------------------------------------------------------------*/
  $(".andro_counter").each(function() {
    var $this = $(this);
    $this.one('inview', function(event, isInView) {
      if (isInView) {
        $this.countTo({speed: 2000});
      }
    });
  });


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

  /*-------------------------------------------------------------------------------
  Coverflow Slider (Playlist home 1)
  -------------------------------------------------------------------------------*/
  const coverflowSlider = new Swiper('.coverflow-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    loop: false,
    initialSlide: 1,
    spaceBetween: 0,
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true
    },
    breakpoints: {
      991: {
        slidesPerView: 'auto'
      },
      575: {
        slidesPerView: 2
      }
    }
  });
  $(".andro_music-player-backward").on('click', function(e) {
    e.preventDefault();
    coverflowSlider.slidePrev();
  });
  $(".andro_music-player-forward").on('click', function(e) {
    e.preventDefault();
    coverflowSlider.slideNext();
  });

  /*-------------------------------------------------------------------------------
  Centered Slider (Blog home 3)
  -------------------------------------------------------------------------------*/
  const centeredSlider = new Swiper('.centered-slider', {
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    loop: false,
    initialSlide: 1,
    spaceBetween: 0,
    breakpoints: {
      575: {
        spaceBetween: 30,
        slidesPerView: 2,
      },
      1199: {
        spaceBetween: 120,
        slidesPerView: 1.8,
      },
    }
  });

  /*-------------------------------------------------------------------------------
  Full Width Slider (Arists home 2)
  -------------------------------------------------------------------------------*/
  const fullWidthSlider = new Swiper('.fw-slider', {
    grabCursor: true,
    spaceBetween: 15,
    slidesPerView: 1,
    loop: true,
    autoplay: true,
    breakpoints: {
      600: {
        slidesPerView: 2
      },
      991: {
        slidesPerView: 3
      },
      1400: {
        spaceBetween: 30,
        slidesPerView: 4
      }
    }
  });

  /*-------------------------------------------------------------------------------
  Single Slider (Blog details sidebar)
  -------------------------------------------------------------------------------*/
  const singleSlider = new Swiper('.single-slider', {
    grabCursor: true,
    spaceBetween: 0,
    slidesPerView: 1,
    loop: false,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets'
    }
  });

  /*-------------------------------------------------------------------------------
  Vertical Slider (Artists home 1)
  -------------------------------------------------------------------------------*/
  const verticalSlider = new Swiper('.vertical-slider .swiper-container', {
    slidesPerView: 1,
    loop: false,
    speed: 500,
    spaceBetween: 0,
    touchEventsTarget: 'wrapper',
    navigation: {
      nextEl: '.vertical-slider .swiper-button-next',
      prevEl: '.vertical-slider .swiper-button-prev'
    },
    on: {
      init: function(sw) {
        $('.vertical-slider-count').html(sw.slides.length);
      },
      slideChange: function(sw) {
        $('.vertical-slider-current').html(sw.activeIndex + 1);
      }
    }
  });

  /*-------------------------------------------------------------------------------
  Window Events
  -------------------------------------------------------------------------------*/
  $(window).on("scroll", function() {
    doParallaxScrollEffect();
  });

})(jQuery);

