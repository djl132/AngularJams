 (function() {
   
   
    /**
     * @function play
     * @desc //return factory service that exposes Song functions(play/pause) through an object
     * @param {Object} song
     */  
    function SongPlayer() {
      
      /**
       * @desc service object giving albumCtrl songplaying methods
       * @type {Object}
       */
      var SongPlayer = {};
      
      /**
       * @desc stores reference to currentSong and used for condition checking
       * @type {Object}
       */
      var currentSong = null;//access currentSong object
      
      /**
       * @desc Buzz object audio file
       * @type {Object}
       */
      var currentBuzzObject = null;

      /**
       * @function playSong
       * @desc plays currentBuzzObject and informs UI song is playing
       * @param {Object} song
       */      
       var playSong = function(song){
        currentBuzzObject.play();
        song.playing = true;
      }
       
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
      
       /**
       * @function play
       * @desc plays a song based on which songrow is clicked
       * @param {Object} song
       */      
      SongPlayer.play = function(song){
        //no currentSong playing (null)(initial state)
        //yes currentSong could be playing(nonnull)
        if(song !== currentSong){
          setSong(song);
          song.playing = true;//inform ui to display pause button
        }
        else if(song === currentSong){
          if(currentBuzzObject.isPaused())
            playSong(song);
        }
       };
      
       /**
       * @function pause
       * @desc pauses currently playing song
       * @param {Object}
       */
       SongPlayer.pause = function(song){
         currentBuzzObject.pause();
         song.playing = false;//will show play button, since it is still hovered over
       };
       
          return SongPlayer;
     }
 
   
   //add service to blocJams app/module
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();

