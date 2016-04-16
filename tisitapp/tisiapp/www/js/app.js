// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])
    .constant('FirebaseUrl', "https://tepatiki.firebaseio.com/")
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'templates/login.html',
        resolve: {
            "currentAuth": function(Auth, $localStorage, Users, $state) {
                /* $waitForAuth returns a promise so the resolve waits for it to complete */

                return Auth.$requireAuth().then(function(data) {
                    /*  In the existence of a valid Auth in the phone.
                     *  1. We will create/update the $localStorage userProfile
                     *  2. Then we will redirect to app.schedule
                     */
                    console.log(data);

                    $state.go('tab.dash');

                }, function(error) {
                    console.log("Error from app.js resolve login: " + error);
                });
            }
        }
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', { //estadistica
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

  

    .state('tab.chats', { //historial
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'templates/tab-chats.html',
                controller: 'ChatsCtrl',
                resolve:{
                  "pachi":function(Users, $localStorage){
                    return Users.locate($localStorage.get('paciente'));
                  }
                }
            }
        }
    })
        .state('tab.chat-detail', { //alta
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});