// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('triash', ['ionic', 'ngCordova', 'triash.controllers', 'triash.services', 'triash.filters','firebase', 'ionic-datepicker','progressButton'])
.constant('FirebaseUrl', "https://tepatiki.firebaseio.com/")
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider){
  $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-thin-left');

  $stateProvider

  .state('login',{
    url:'/login',
    templateUrl:'templates/login.html',
    controller:'LoginCtrl',
    resolve:{
    }
  })

  .state('home',{
    url:'/home',
    templateUrl:'templates/home.html',
    controller:'HomeCtrl',
    resolve:{

    }
  })
  .state('register',{
    url:'/register',
    templateUrl:'templates/register.html',
    controller:'RegisterCtrl',
    resolve:{

      
    }
  })
  .state('checate',{
    url:'/checate',
    templateUrl:'templates/checate.html',
    controller:'ChecateCtrl',
    resolve:{
      "currentAuth":function(Auth,$state){
        Auth.$requireAuth().then(function(data){
          console.log(data)
        },function(error){
          console.log(error);
          $state.go('login')
        })
      }
    }
  })

  $urlRouterProvider.otherwise('/home');

})