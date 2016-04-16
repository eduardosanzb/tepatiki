angular.module('starter.controllers', [])

.controller('DashCtrl', function($rootScope, $scope, Users, $ionicPopup, $state) {
  $scope.user = {}
  $scope.locateUser = function(){

    Users.locate($scope.user.curp).$loaded().then(function(data){
      if(data.length == 0){
         $ionicPopup.alert({
                title: 'Paciente no Existe',
                template: 'No existe un paciente con este CURP'
            }).then(function(){
              $scope.user = {}
            });
      } else{
        console.log(data)
        $scope.paciente = data;
      }


    });
  }


  /*MODAL STUFF*/
})

.controller('ChatsCtrl', function($scope) {
  
})

.controller('LoginCtrl',function(Auth, $localStorage, $state, $scope, Doctores){
  console.log("LoginCtrl")
  $scope.user = {};

  $scope.login = function(){
    console.log("LOgin the user")
    Auth.$authWithPassword({
      email:$scope.user.email,
      password:$scope.user.password
    }).then(function(authData){
      console.log("User logged successfully with uid: " + authData.uid);
      Doctores.get(authData.uid).$loaded().then(function(user){
        var user = {
          uid:user.$id,
          name:user.name + " " + user.surname,
          credentials:user.credentials
        }
        $localStorage.setObject('userProfile',user);
      })
      $state.go('tab.dash');

    },function(error){
      console.log("Sorry we could login the user: " + error)
    });
  }

})


.controller('DetailUserCtrl', function($scope, $stateParams) {
  
})

.controller('AccountCtrl', function($scope) {
  
});
