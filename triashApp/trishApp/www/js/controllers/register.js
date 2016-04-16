angular.module('triash.controllers')
.controller('RegisterCtrl',RegisterCtrl);
RegisterCtrl.$inject = ["$rootScope", "$scope", "$state", "$ionicModal", "$ionicLoading", "$localStorage","States","Auth","Users"];
function RegisterCtrl ($rootScope, $scope, $state, $ionicModal, $ionicLoading, $localStorage,States, Auth, Users){
  $scope.flag = false;
  $scope.user = {}


  $scope.states = States.all();
  /*SAVE USER*/
  $scope.saveUser = function(){
    $ionicLoading.show({
        template: ' <ion-spinner icon="lines" class="spinner-light"></ion-spinner><br /><span>Loading...</span>',
    });
    console.log($scope.user)
    var newUser = {
      email:$scope.user.curp + "@curp.com" ,
      password:$scope.user.curp,
      name:$scope.user.name,
      pSurname:$scope.user.pSurname,
      mSurname:$scope.user.mSurname,
      municipio:$scope.user.municipio,
      state:$scope.user.state,
      tel:$scope.user.tel,
      adress:$scope.user.adress,
      curp:$scope.user.curp
    }
    console.log(newUser);
    Auth.$createUser(newUser).then(function(userData){
      console.log("User created with uid: " + userData.uid);
      Users.ref().child(userData.uid).set(newUser);
      console.log("User data stored: " + Users.get(userData.uid));
      $state.go('home')
      $ionicLoading.hide();
    },function(error){
      console.log("Error creating hte user: " + error);
      $ionicLoading.hide();
    })
  }
  /*STATES LOGIC*/
  $scope.stateSelected = function(state){
    $scope.user.state = state.nombre;
    $scope.municipios = $scope.states[state.$id].municipios.municipio;
    $scope.flag = true;
    $scope.statesModal.hide();
  }
  $scope.municipioSelected = function(municipio){
    $scope.user.municipio = municipio.nombre;
    $scope.municipiosModal.hide();
  }

  /*MODALS STUDD*/
  $ionicModal.fromTemplateUrl('templates/modals/states.html',{
    scope:$scope,
    animation:'slide-in-up'
  }).then(function(modal){
    $scope.statesModal = modal;
  })
  $ionicModal.fromTemplateUrl('templates/modals/municipios.html',{
    scope:$scope,
    animation:'slide-in-up'
  }).then(function(modal){
    $scope.municipiosModal = modal;
  })
}