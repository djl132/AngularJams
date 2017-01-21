

//creates a controller to manage UI in the collection state(collection.html template)
(function(){
    function CollectionCtrl(){
      
      //bind album data into collection controller so that View has access to it
      this.albums = [];
      for(var i=0; i<12; i++){
        this.albums.push(angular.copy(albumPicasso));
      }
      
    }
angular
  .module('blocJams') //is this line getting the app? and then adding another controller to it for the state 'collection'?
  .controller('CollectionCtrl', 
              CollectionCtrl);
})();

