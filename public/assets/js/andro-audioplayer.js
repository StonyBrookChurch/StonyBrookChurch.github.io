(function($) {
  'use strict';

  /*-------------------------------------------------------------------------------
  Click handler responsible to play/pause the audio track
  -------------------------------------------------------------------------------*/
  $('.andro_music-player-play').on('click', function(e) {
    e.preventDefault();

    let $track = $(this).closest('.andro_audio-track'),
    audio = $track.find('audio')[0],
    isPlaying = $track.hasClass('playing');

    pauseAllAudio($('.andro_music-player-play').index(this));

    if(isPlaying) {
      pauseAudio(audio, $track);
    } else {
      $("body").find('.playing').removeClass('playing');
      playAudio(audio, $track);
    }

    seekAudio(audio, $track, isPlaying);

  });

  /*-------------------------------------------------------------------------------
  Click handler responsible to seek to a particular time of the audio track
  -------------------------------------------------------------------------------*/
  $(".andro_music-player-seekbar").on('click', function(e){
    let $track = $(this).closest('.andro_audio-track'),
    audio = $track.find('audio')[0];

    seekTo(e.offsetX, audio, $track);
  });

  /*-------------------------------------------------------------------------------
  Click handler responsible to seek 20 seconds more & less
  -------------------------------------------------------------------------------*/
  $(".andro_music-player-seek-partition").on('click', function(e){
    e.preventDefault();
    let $track = $(this).closest('.andro_audio-track'),
    audio = $track.find('audio')[0];

    let percent = audio.duration / 20,
    progressBar = $track.find('.andro_music-player-progress');

    if( $(this).hasClass('andro_music-player-seek-20-more') ){
      audio.currentTime = audio.currentTime + 20;
    }else{
      audio.currentTime = audio.currentTime - 20;
    }

    progressBar.value = $track.find('.andro_music-player-progress').width() + percent;

  });

  /*-------------------------------------------------------------------------------
  Function responsible to display the duration in minutes for every track on a page
  -------------------------------------------------------------------------------*/
  function calculateAudioDurations(){

    let tracks = $('.andro_audio-track');

    if(tracks.length > 0){
      tracks.each( function( index, element ){

        let durationWrap = $(element).find('.andro_music-player-duration'),
        audioElem = $(element).find('audio')[0];

        if( durationWrap.length > 0 ){
          durationWrap.html(sToTime(audioElem.duration));
        }

      });
    }

  }

  // Update progress bar and time
  function seekAudio(audio, elem, isPlaying){
    setInterval(function() {
      elem.find('.andro_music-player-progress').css({
        width: audio.currentTime / audio.duration * 100 + '%'
      });
      elem.find('.andro_track-visualiser rect').css({
        width: audio.currentTime / audio.duration * 100 + '%'
      });
      elem.find('.andro_music-player-time').html(sToTime(audio.currentTime));

      if( audio.currentTime == audio.duration ){
        resetAudio(audio, elem);
      }

    }, 1000 / 60);
  }

  // Seek to a particular second
  function seekTo(offset, audio, elem){
    let percent = offset / elem.find('.andro_music-player-seekbar').width(),
    progressBar = elem.find('.andro_music-player-progress');
    audio.currentTime = percent * audio.duration;

    progressBar.value = percent / 100;
  }

  $(".andro_music-player-volume-control").on('click', function(e){

    e.preventDefault();

    let $track = $(this).closest('.andro_audio-track'),
    audio = $track.find('audio')[0];

    controlVolume( e.pageX, audio, $track );

  });

  // Controls the volume of an audio
  function controlVolume( offset, audio, elem ){

    let progressBar = elem.find('.andro_music-player-volume-control-progress'),
    pos = offset - elem.find('.andro_music-player-volume-control').offset().left,
    percent = pos / elem.find('.andro_music-player-volume-control').width();

    audio.volume = percent;

    progressBar.css({
      width: percent * 100 + '%'
    });

  }

  // Convert audio currenTime (seconds) to minutes
  function sToTime(t) {
    return padZero(parseInt((t / (60)) % 60)) + ":" + padZero(parseInt((t) % 60));
  }
  function padZero(v) {
    return (v < 10) ? "0" + v : v;
  }

  // Play a track
  function playAudio(audio, elem){
    audio.play();
    elem.addClass('playing');
    elem.find('.andro_music-player-play').html('<i class="fas fa-pause"></i>');
  }

  // Pause a track
  function pauseAudio(audio, elem){
    audio.pause();
    elem.removeClass('playing');
    elem.find('.andro_music-player-play').html('<i class="fas fa-play"></i>');
  }

  // Pause any audio available in a page
  function pauseAllAudio(currentIndex){
    $(".andro_music-player-play").html('<i class="fas fa-play"></i>');
    for(let i = 0; i < $("audio").length; i++){
      $("audio")[i].pause();
      if( i != currentIndex ){
        $("audio")[i].currentTime = 0;
      }
    };
  }

  // Reset current audio track to 0
  function resetAudio(audio, elem){
    audio.currentTime = 0;
    pauseAudio(audio, elem);
  }

  $(document).ready(function(){
    calculateAudioDurations();
  })

})(jQuery);
