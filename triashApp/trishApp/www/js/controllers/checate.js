angular.module('triash.controllers')
.controller('ChecateCtrl',ChecateCtrl);
ChecateCtrl.$inject = ["$rootScope", "$scope", "$state", "$ionicModal", "$ionicLoading", "$localStorage","$ionicSlideBoxDelegate","UnAuth"];
function ChecateCtrl ($rootScope, $scope, $state, $ionicModal, $ionicLoading, $localStorage, $ionicSlideBoxDelegate, UnAuth){
  $scope.progress = 0;

  $ionicSlideBoxDelegate.enableSlide(true);
  $scope.click = function(id){
    $scope.progress = 1;
    $ionicSlideBoxDelegate.next();
  }


  $scope.close = function(){
    
    UnAuth.unauth();
    $localStorage.setObject('userProfile',null)
    $state.go('home');
  }


}