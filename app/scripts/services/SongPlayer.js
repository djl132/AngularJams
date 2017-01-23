 (function() {
   
   //return factory service that exposes play function through an object that can be used by another controller through injection to reference the object returned "SongPlayer"
    function SongPlayer() {
      var SongPlayer = {};
      
      var currentSong = null;//access currentSong object
      
      /**
       * @desc Buzz object audio file
       * @type {Object}
       */
      var currentBuzzObject = null;

      /**
       * @function setSong
       * @desc Stops currently playing song and loads new audio file as currentBuzzObject
       * @param {Object} song
       */      
      var setSong = function(song){
        
        //if there is a currentlyplaying
        if(currentBuzzObject){
          currentBuzzObject.stop(); //WHY NOT JUST PAUSE IT?
          currentSong.playing = null; //UI boolean value
        }
        
        currentBuzzObject = new buzz.sound(song.audioUrl,
              { formats: ['mp3'], preload: true}
              );
        currentBuzzObject.play();
        currentSong = song; //inform play function
       };
      
      SongPlayer.play = function(song){
        //no currentSong playing (null)(initial state)
        //yes currentSong could be playing(nonnull)
        if(song !== currentSong){
          setSong(song);
          song.playing = true;//inform ui to display pause button
        }
        else if(song === currentSong){
          if(currentBuzzObject.isPaused())
            currentBuzzObject.play();
        }
       };
       
       SongPlayer.pause = function(song){
         currentBuzzObject.pause();
         song.playing = false;//will show play button, since it is still hovered over
       };
       
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();

(function(){
  
  function SongPlayer(){
    var SongPlayer = {};
    return SongPlayer;
  }

    angular
          .module('blocJams')
          .factory('SongPlayer', SongPlayer);
})();