angular.module('starter.controllers', [])

.controller('DashCtrl', function($rootScope, $scope, Users, $ionicPopup, $state, $localStorage, $ionicModal) {
  $scope.user = {}
  $scope.logs = []

  $scope.locateUser = function(){

    Users.locate($scope.user.curp).$loaded().then(function(data){
      console.log(data)
      $scope.pid = data[0].$id
      if(data.length == 0){
         $ionicPopup.alert({
                title: 'Paciente no Existe',
                template: 'No existe un paciente con este CURP'
            }).then(function(){
              $scope.user = {}
            });
      } else{
        $localStorage.set('paciente',data[0].curp)
        $scope.paciente = data;
        $scope.paciente.logs = [];
        Users.logs(data[0].$id).$loaded().then(function(data){
          angular.forEach(data, function(log){
            console.log(log.user)
            if(log.user == $scope.pid){
              console.log(log.height)
              $scope.height = log.height;
              $scope.logs.push(log)
            }

          })
        })
        
        
        
      }

    });
  }
  /*MODAL STUFF*/
  $scope.openModal = function(log){
    $scope.detailed = log;
    $scope.modal.show()
  }

  $ionicModal.fromTemplateUrl('templates/modal.html',{
    scope:$scope,
    animation:'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  })
})

.controller('ChatsCtrl', function($scope, $rootScope,$localStorage, Users, Logs, pachi, Consultas) {
  pachi.$loaded().then(function(data){
    console.log(data)
    $scope.paciente = data;
  })


  $scope.createConsult = function(){
    var consulta = {
      folio:$scope.user.folio,
      date:new Date().getTIme(),
      diagnostico:$scope.user.diagnostico,
      user:$localStorage.get('paciente')
    }
    var newLog = Consultas.ref().push();
    var logID = newLog.key();
    Consultas.ref().child(logID).set(consulta);
    Users.get(consulta.user).child(logID).set(true);
  }
  
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
