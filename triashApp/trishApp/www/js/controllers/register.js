angular.module('triash.controllers')
.controller('RegisterCtrl',RegisterCtrl);
RegisterCtrl.$inject = ["$rootScope", "$scope", "$state", "$ionicModal", "$ionicLoading", "$localStorage","States","Auth","Users"];
function RegisterCtrl ($rootScope, $scope, $state, $ionicModal, $ionicLoading, $localStorage,States, Auth, Users){
  $scope.flag = false;
  $scope.user = {}


  $scope.states = States.all();
  /*SAVE USER*/
  var cameraOptions = {
    quality: 50,
    destinationType: 0,
    encodingType: 0,
    saveToPhotoAlbum: false,
    cameraDirection:1
}
  $scope.saveUser = function(){
    navigator.camera.getPicture(cameraCallback, errorCallback, {
    quality: 50,
    destinationType: 0,
    encodingType: 0,
    saveToPhotoAlbum: false,
    cameraDirection:0
});
  }

  function cameraCallback(img){
    $ionicLoading.show({
        template: ' <ion-spinner icon="lines" class="spinner-light"></ion-spinner><br /><span>Loading...</span>',
    });
    console.log($scope.user)
    var userToCreate = {
      email:$scope.user.curp + "@curp.com" ,
      password:$scope.user.curp
    }
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
      curp:$scope.user.curp,
      picture:img
    }
    console.log(newUser);
    Auth.$createUser(userToCreate).then(function(userData){
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
  function errorCallback(error){
    alert("Upss something went wrong");
    console.log(error);
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