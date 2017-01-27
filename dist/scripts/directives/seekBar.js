 (function() {
      function seekBar($document) {
        
        var calculatePercent = function(seekBar, event) {
             var offsetX = event.pageX - seekBar.offset().left;
             var seekBarWidth = seekBar.width();
            var percent = offsetX/seekBarWidth;
            percent = Math.max(0,percent);
            percent = Math.min(1,percent);
            return percent;
        };

         return {
           
              //restrict: 'E' instructs Angular to treat this directive as an element. 
              //replace: true instructs Angular to completely replace the <seek-bar> element with the directive's HTML template
              //The templateUrl option specifies the path to the HTML template that the directive will use. 
               templateUrl: '/templates/directives/seek_bar.html',
               replace: true,
               restrict: 'E',
           //scopes the directive to outside, specifically, PlayerBarController in order to access songPlayer's scop.value and max, later used in notifyOnChange
               scope: {
                  onChange: '&'
               },
           
           //gives each seek bar instance a separate scope
               link: function(scope, element, attributes) {
                   // directive logic to return
                 
                 //will store and change the real-time css percentage- value of the thumb and fill of a certain seekbar
                 //all functions changing the style
                 scope.value = 0;
                 scope.max = 100;
                 
                 //gives the current seekbar jQuery functionality
                 var seekBar = $(element); 
                 
                 
//                 We use the directive's scope to determine the location of the seek bar thumb, and correspondingly, the playback position of the song.???????what?
                 //View value attribute --> Model changes in value(currentTime)
                 //UPDATE directive's ngStyle handlers about chnages in currentTime and length of song(value and max specifically.)
                 attributes.$observe('value', function (newValue){
                   scope.value = newValue;
                 });
                //View value attribute--> Model changes in max(duration)
                  attributes.$observe('max', function (newValue){
                   scope.max = newValue;
                 });
                 
                  //notifies directive's View about changes in songPlayer's values which now has access to the 
                  var notifyOnChange = function(newValue){
                    if(typeof scope.onChange === 'function')
                      scope.onChange({value: newValue});//THE REFERENCE TO PARENTSCOPE SEEKBAR), IS THERE.
                  }
            
                 //returns ngStyle css format of percentage change 
                 var percentString = function(){
                   var value = scope.value;
                   var max = scope.max;
                   var percent = value / max * 100;
                   return percent + "%";        };
                 
                 //both use data-bound scope.value stuff to update css of seekbar components
                 scope.fillStyle = 
                   function(){ 
                   return {width: percentString()}; };//returns object for ng-style, which takes in an object. 
                 scope.thumbStyle = 
                   function(){
                   return {left: percentString()};};
                 
                 //click handler - event info.
                 scope.onClickSeekBar = function(event){
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max; //data bound - will update view in real-time
                    notifyOnChange(scope.value);
                 };
                 
                 //tracks thumb of respective
                scope.trackThumb = function() {                       
                  $document.bind('mousemove.thumb', function(event) {//BEGINS A NEW TURN
                         var percent = calculatePercent(seekBar, event);
                         scope.$apply(function() {//in order to bind data in the seekBar template(tell View seekBar template about chnages)

                            scope.value = percent * scope.max;//updating an angular value using non-Angular callbacks(liek scope requires apply$)
                            notifyOnChange(scope.value);//sets the current value
                          });
                        });

                        $document.bind('mouseup.thumb', function() {
                           $document.unbind('mousemove.thumb');
                           $document.unbind('mouseup.thumb');
                        });
                  };
          
         }
     };
  }
 
     angular
         .module('blocJams')
         .directive('seekBar', ['$document',seekBar]);
 })();
 