
///WHY USE A CLOSURE?
(function(){
  function config($stateProvider,$locationProvide) {
    
    //PROVIDES RULES ABOUT HOW TO DISPLAY LOCATION INFO?
    $locationProvider
      .html5Mode({
        enabled:true,
        requiredBase: false
    });
     
    //PROVIDES INFORMATION REGARDING EACH STATE OF THE APP
    //$stateProvider.state(stateName, stateConfig)
    //stateName is a unique string that identifies a state and stateConfig is an object that defines specific properties of the state. 
    $stateProvider //METHOD-CHAINING
      .state('landing', {
          url:'/',
          templateUrl: '/templates/landing.html'
      })
    
      .state('album', {
          url:'/album', //what does this lien do?
          templateUrl: '/templates/album.html'
    })
             
      .state('collection', {
            url:'/', ///waht exaclty is this?
            templateUrl: '/templates/collection.html'
    }); 
  }
  
  angular
    .module('blocJams', ['ui.router']);
    .config(config);//CONFIGURES, SETS HOW THE APP IS RUN(RULES); IS THAT CORRECT????

})();

