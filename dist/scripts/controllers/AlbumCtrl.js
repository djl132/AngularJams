(function(){
    function AlbumCtrl(Fixtures){
      
      //bind album data into collection controller so that View has access to it
      this.albumData = Fixtures.getAlbum();
    }
  angular
    .module('blocJams') //is this line getting the app? and then adding another controller to it for the state 'collection'?
    .controller('AlbumCtrl', ['Fixtures',
                AlbumCtrl]);
})();
