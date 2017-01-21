
//organizes behavior of an app based on state(the fundamental unit of behavior via UI-Router) and gives each state a LOOK(templateurl) and behavior(CONTROLLERS

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
          templateUrl: '/templates/landing.html',
          controller:'LandingCtrl as landing' //designate a controller for a specific state
      })
    
      .state('album', {
          url:'/album', //what does this lien do?
          templateUrl: '/templates/album.html'
    })
             
      .state('collection', {
            url:'/', ///waht exaclty is this?
            templateUrl: '/templates/collection.html',
            controller:'CollectionCtrl as collection'
    }); 
  }
  
  angular
    .module('blocJams', ['ui.router'])
    .config(config);//configures BEHAVIOR and LOOK of the app

})();

