

//creates a controller to manage UI in the collection state(collection.html template)
(function(){
    function CollectionCtrl(Fixtures){

      //bind album data into collection controller so that View has access to it
      this.albums = Fixtures.getCollection(12); //gives controller specific properties --> View of collection.

    }

    angular
    .module('blocJams') //is this line getting the app? and then adding another controller to it for the state 'collection'?
    .controller('CollectionCtrl', ['Fixtures',
                CollectionCtrl]);
})();
