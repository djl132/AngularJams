
//organizes behavior of an app based on state(the fundamental unit of behavior via UI-Router) and gives each state a LOOK(templateurl) and behavior(CONTROLLERS

(function(){
  function config($stateProvider,$locationProvider) {

    //PROVIDES RULES ABOUT HOW TO DISPLAY LOCATION url info?
    $locationProvider
      .html5Mode({
        enabled:true,//prevent hashbang - humanly readable form easier to parse path info.
        requireBase: false
    });

    //configures EACH component(MVCs) OF THE APP based on states
    //$stateProvider.state(stateName, stateConfig)
    //stateName is a unique string that identifies a state and stateConfig is an object that defines specific properties of the state.
    $stateProvider //METHOD-CHAINING
      .state('landing', {
          url:'/',
          templateUrl: '/templates/landing.html',
          controller:'LandingCtrl as landing' //designate a controller for a specific state
      })

      .state('album', {
          url:'/album',
          templateUrl: '/templates/album.html',
          controller: 'AlbumCtrl as album'//SIMPLY TELLS VIEW OF STATE WHICH CONTROLLER TO USE, DOES NOT GIVE IT ACCESS
    })

      .state('collection', {
            url:'/collection', ///waht exaclty is this?
            templateUrl: '/templates/collection.html',
            controller:'CollectionCtrl as collection'
    });
  }

  angular
    .module('blocJams', ['ui.router'])
    .config(config);//configures BEHAVIOR and LOOK of the app using state provider services supplied through ui.router dependency

})();
