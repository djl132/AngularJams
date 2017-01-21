(function(){
    function AlbumCtrl(){
      
      //bind album data into collection controller so that View has access to it
      this.albumData = albumPicasso;
    }
  var test = new AlbumCtrl();
  console.log(test);
  angular
    .module('blocJams') //is this line getting the app? and then adding another controller to it for the state 'collection'?
    .controller('AlbumCtrl', 
                AlbumCtrl);
})();
