 (function() {
   
    function SongPlayer(Fixtures) {
       /**
       * @desc service object giving albumCtrl songplaying methods
       * @type {Object}
       */
      var currentAlbum = Fixtures.getAlbum();
      
      /**
       * @desc service object giving albumCtrl songplaying methods
       * @type {Object}
       */
      var SongPlayer = {};

    /**
      *@function getSongIndex
      *@desc allows controller to know the index of the current song
      *@type number
      */
      var getSongIndex = function(song){
        return currentAlbum.songs.indexOf(song);
      }
      
      /**
       * @function playSong
       * @desc plays currentBuzzObject and informs UI song is playing
       * @param {Object} song
       */      
       var playSong = function(song){
        SongPlayer.currentBuzzObject.play();
        song.playing = true;
      }
        
      /**
       * @function playSong
       * @desc plays currentBuzzObject and informs UI song is playing
       * @param {Object} song
       */      
       var stopSong = function(song){
        SongPlayer.currentBuzzObject.stop();
        song.playing = null;
      }
       
       
       
      
      /**
       * @function setSong
       * @desc Stops currently playing song and loads new audio file as currentBuzzObject
       * @param {Object} song
       */      
      var setSong = function(song){
        
        //if there is a currentlyplaying
        if(SongPlayer.currentBuzzObject){
          stopSong(SongPlayer.currentSong);
        }
        
        SongPlayer.currentBuzzObject = new buzz.sound(song.audioUrl,
              { formats: ['mp3'], preload: true}
              );
        SongPlayer.currentBuzzObject.play();
        SongPlayer.currentSong = song; //inform play function
       };
      
       /**
       * @desc stores public reference to currentSong and used for condition checking
       * @type {Object}
       */
      SongPlayer.currentSong = null;//access currentSong object
      
      /**
       * @desc Buzz object audio file
       * @type {Object}
       */
      SongPlayer.currentBuzzObject = null;
      
       /**
       * @desc current time of current song
       * @type {Object}
       */
      SongPlayer.currentTime = null;
    
      /**
       * @function setCurrentTime
       * @desc set current time(in seconds) of currentSong
       * @param {Number} time
       */    
      SongPlayer.setCurrentTime = function(time){
        if(SongPlayer.currentBuzzObject){
          SongPlayer.currentBuzzObject.setTime(time);
        }
      };
      
       /**
       * @function play
       * @desc plays a song based on which songrow is clicked
       * @param {Object} song
       */      
      SongPlayer.play = function(song){
        song = song || SongPlayer.currentSong; //ADAPTS THE SERVICE'S FUNCTIONALITY FOR TWO CONTROLLERS WITH TWO DIFFERENT INPUT METHODS DUE TO DIFFERENT SCOPES(PLAYERBARCONTROLLER/ALBUMCONTROLLER)
        //no currentSong playing (null)(initial state)
        //yes currentSong could be playing(nonnull)
        if(song !== SongPlayer.currentSong){
          setSong(song);
          song.playing = true;//inform ui to display pause button
        }
        else if(song === SongPlayer.currentSong){
          if(SongPlayer.currentBuzzObject.isPaused())
            playSong(song);
        }
       };
      
       /**
       * @function pause
       * @desc pauses currently playing song
       * @param {Object}
       */
       SongPlayer.pause = function(song){
         song = song || SongPlayer.currentSong;
         SongPlayer.currentBuzzObject.pause();
         song.playing = false;//will show play button, since it is still hovered over
       };
      
      /**
       * @function previous
       * @desc changes to previous song
       */
        SongPlayer.previous = function(){
          var newSongIndex = getSongIndex(SongPlayer.currentSong) - 1;
          if(newSongIndex< 0){
            stopSong(SongPlayer.currentSong);
          }
          else{
            var song = currentAlbum.songs[newSongIndex];
            setSong(song);//backend code
            playSong(song);//frontend code
          }
        };
       
      /**
       * @function next
       * @desc changes to previous song
       */
        SongPlayer.next = function(){
          var newSongIndex = getSongIndex(SongPlayer.currentSong) + 1;
          if(newSongIndex > currentAlbum.songs.length - 1){
            stopSong(SongPlayer.currentSong);
          }
          else{
            var song = currentAlbum.songs[newSongIndex];
            setSong(song);//backend code
            playSong(song);//frontend code
          }
        };  
          return SongPlayer;
     }
 
   
   //add service to blocJams app/module
     angular
         .module('blocJams')
         .factory('SongPlayer',['Fixtures', SongPlayer]);
 })();

