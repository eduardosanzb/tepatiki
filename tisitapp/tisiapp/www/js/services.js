angular.module('starter.services',[])
.factory('Auth',Auth)
.factory('UnAuth',UnAuth)
.factory('Users',Users)
.factory('Doctores', Doctores)
.factory('Logs',Logs)
.factory('Consultations',Consultations)
.factory('States',States)
.factory('$localStorage', $localStorage);

Auth.$inject = ['FirebaseUrl', '$firebaseAuth'];
function Auth(FirebaseUrl, $firebaseAuth) {
    var ref = new Firebase(FirebaseUrl);
    return $firebaseAuth(ref);
}
UnAuth.$inject = ['FirebaseUrl', '$firebaseAuth'];
function UnAuth(FirebaseUrl, $firebaseAuth) {
    var ref = new Firebase(FirebaseUrl);
    return ref;
}

Users.$inject = ["FirebaseUrl","$firebaseArray", "$firebaseObject"];
function Users (FirebaseUrl,$firebaseArray, $firebaseObject){
  var ref = new Firebase(FirebaseUrl + "tepatikitapp/users/");
  return {
        ref: function() {
            return ref;
        },
        get: function(userId) {
            return $firebaseObject(ref.child(userId));
        },
        locate: function(curp){
            return $firebaseArray(ref.orderByChild('curp').equalTo(curp))
            
        }
    }
}

Doctores.$inject = ["FirebaseUrl","$firebaseArray", "$firebaseObject"];
function Doctores (FirebaseUrl,$firebaseArray, $firebaseObject){
  var ref = new Firebase(FirebaseUrl + "tisitapp/users/");
  return {
        ref: function() {
            return ref;
        },
        get: function(userId) {
            return $firebaseObject(ref.child(userId));
        }
    }
}

Logs.$inject = ["FirebaseUrl","$firebaseArray", "$firebaseObject"];
function Logs (FirebaseUrl,$firebaseArray, $firebaseObject){
    var ref = new Firebase(FirebaseUrl + "tepatikitapp/logs/");
    return {
        ref: function(){
            return ref;
        }
    }
}
  

Consultations.$inject = ["FirebaseUrl","$firebaseArray", "$firebaseObject"];
function Consultations (FirebaseUrl,$firebaseArray, $firebaseObject){ }



function States(FirebaseUrl, $firebaseArray, $firebaseObject, $rootScope) {
    var ref = new Firebase(FirebaseUrl + "states/");
    return {
        all: function() {
          
          return $firebaseArray(ref.orderByChild("NOMBRE"));
        }
    }
}
States.$inject = ['FirebaseUrl', '$firebaseArray', '$firebaseObject', '$rootScope'];





$localStorage.$inject = ['$window'];
function $localStorage($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || 'null');
        }
    }
}

