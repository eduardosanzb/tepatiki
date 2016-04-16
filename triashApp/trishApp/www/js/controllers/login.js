angular.module('triash.controllers')
.controller('LoginCtrl',LoginCtrl);
LoginCtrl.$inject = ["$rootScope", "$scope", "$state", "$ionicModal", "$ionicLoading", "$localStorage", "ionicDatePicker","Auth","Users"];
function LoginCtrl ($rootScope, $scope, $state, $ionicModal, $ionicLoading, $localStorage, ionicDatePicker,Auth, Users){
$scope.user = {}
$scope.login = function(){
  $ionicLoading.show({
        template: ' <ion-spinner icon="lines" class="spinner-light"></ion-spinner><br /><span>Loading...</span>',
    });
  var credential = {
    email:$scope.user.curp + "@curp.com" ,
    password:$scope.user.curp
  }
  console.log(credential)
  Auth.$authWithPassword(credential).then(function(data){
    console.log("logged with: ")
    console.log(data)
    Users.get(data.uid).$loaded().then(function(uData){
      var user = {
        name:uData.name,
        uid:uData.$id
      }
      $localStorage.setObject('userProfile',user);
    })
  
    
    $state.go('checate')
    $ionicLoading.hide();
  },function(error){
    console.log("Error login the user: " + error);
    $ionicLoading.hide();
    $scope.user = {}
  } )
}



 }