 (function() {
      function seekBar($document) {
        
        var calculatePercent = function(seekBar, event) {
             var offsetX = event.pageX - seekBar.offset().left;
             var seekBarWidth = seekBar.width();
            var percent = offsetX/seekBarWidth;
            percent = Math.max(0,percent);
            percent = Math.min(1,percent);
            return percent
        };

         return {

              //restrict: 'E' instructs Angular to treat this directive as an element. 
              //replace: true instructs Angular to completely replace the <seek-bar> element with the directive's HTML template
              //The templateUrl option specifies the path to the HTML template that the directive will use. 
               templateUrl: '/templates/directives/seek_bar.html',
               replace: true,
               restrict: 'E',
               scope: { },//gives each seek bar instance a separate MODEL.
               link: function(scope, element, attributes) {
                   // directive logic to return
                 
                 scope.value = 0;
                 scope.max = 100;
                 
                 var seekBar = $(element); //differentiates which seekbar
                 
                 var percentString = function(){
                   var value = scope.value;
                   var max = scope.max;
                   var percent = value / max * 100;
                   return percent + "%";        };
                 
                 scope.fillStyle = 
                   function(){ 
                   return {width: percentString()}; };//returns object for ng-style, which takes in an object. 
                 
                 //click handler - event info.
                 scope.onClickSeekBar = function(event){
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max; 
                 };
                 
                 //tracks thumb of respective
                  scope.trackThumb = function() {                       $document.bind('mousemove.thumb', function(event) {
                           var percent = calculatePercent(seekBar, event);
                           scope.$apply(function() {
                               scope.value = percent * scope.max;
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
 