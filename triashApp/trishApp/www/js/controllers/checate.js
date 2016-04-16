angular.module('triash.controllers')
    .controller('ChecateCtrl', ChecateCtrl);
ChecateCtrl.$inject = ["$rootScope", "$scope", "$state", "$ionicModal", "$ionicLoading", "$localStorage", "$ionicSlideBoxDelegate", "UnAuth", "$ionicPlatform","Logs", "Users"];

function ChecateCtrl($rootScope, $scope, $state, $ionicModal, $ionicLoading, $localStorage, $ionicSlideBoxDelegate, UnAuth, $ionicPlatform,Logs,Users) {
    $scope.progress = 0;
    $scope.macAddress = "00:06:66:6A:52:49";
    $scope.user = {}
    
    $scope.user.ecg = [];

    


    $ionicSlideBoxDelegate.enableSlide(true);
    $scope.click = function(char, step) {
        $scope.user.name = $localStorage.getObject('userProfile').name;
        $ionicLoading.show();
        $scope.step = step;
        $scope.getMeasure(char)
    }

    $scope.close = function() {
      var newLog = Logs.ref().push();
      var logID = newLog.key();
      var log = {
        user:$localStorage.getObject('userProfile').uid,
        height:$scope.user.height,
        temperature:$scope.user.temperature,
        pulse:$scope.user.pulse,
        ecg:$scope.user.ecg,
        date: new Date().getTime()
      }
      Logs.ref().child(logID).set(log);
      Users.ref().child($localStorage.getObject('userProfile').uid).child("logs").child(logID).set(true)
      
        UnAuth.unauth();
        $localStorage.setObject('data',JSON.stringify($scope.user.ecg))
        $localStorage.setObject('userProfile', null)
        $state.go('home');
    }

    /*BLUETOOTH CONFIG*/
    $scope.connect = function() {
        console.log("00:06:66:6A:52:49")
        $ionicLoading.show();
        bluetoothSerial.connect("00:06:66:6A:52:49", function(value) {
            //bluetoothSerial.write('1');
            console.log("NOw we are conected to: " + value);
            var onSuccess = function(data) {

                console.log("We are getting data from: ");
                //console.log(data);
                /*  Strategy:
                 *  1. We will be listening for the data continuosly
                 *  2. There will be 4 type of messages:
                 *    height = ["h,value"]
                 *    temperature = ["t,value"]
                 *    pulse = ["p,value"]
                 *    ECG = ["e,value"]
                 */
                switch (data.charAt(0)) {
                    case 'a':
                        console.log("The height is: " + data);
                        var string = $scope.splitValue(data)
                        $scope.user.height = string.substring(0, string.indexOf('|'));
                        $scope.progress = $scope.step / 4;
                        $scope.$apply();
                        bluetoothSerial.clear();
                        $ionicLoading.hide();
                        $ionicSlideBoxDelegate.next();
                      break;
                    case 't':
                        console.log("The temperature is: " + data);
                        var string = $scope.splitValue(data)
                        $scope.user.temperature = string.substring(0, string.indexOf('|'));
                        $scope.progress = $scope.step / 4;
                        $scope.$apply();
                        bluetoothSerial.clear();
                        $ionicLoading.hide();
                        $ionicSlideBoxDelegate.next();

                        break;
                    case 'p':
                        console.log("The pulse is: " + data);
                        var string = $scope.splitValue(data)
                        $scope.user.pulse = string.substring(0, string.indexOf('|'));
                        $scope.progress = $scope.step / 4;
                        $scope.$apply();
                        bluetoothSerial.clear();
                        $ionicLoading.hide();
                        $ionicSlideBoxDelegate.next();
                        break;
                    case 'e':
                        console.log("The ecg is: " + data);
                        var tempValue = data.split(',');
                        $scope.user.ecg.push( Number( tempValue[1] ), Number( tempValue[2].substring(0, tempValue[2].indexOf('|')) ) );
                        //$scope.user.voltaje.push(tempValue[1]);
                        //$scope.user.time.push( tempValue[2].substring(0, tempValue[2].indexOf('|')) );
                        //$scope.progress = $scope.step / 4;
                        $scope.$apply();
                        $ionicLoading.hide();
                        $ionicSlideBoxDelegate.next();
                        break;
                }
            }
            var onError = function(error) {
                console.log("There was an error with the subscription");
                console.log(error)
            }
            bluetoothSerial.subscribe('\r', onSuccess, onError);
            $ionicLoading.hide();

        }, function(error) {
            console.log("Error connecting: " + error);
        })
    }

    $scope.getMeasure = function(char) {
        bluetoothSerial.write(char);
    }
    $scope.splitValue = function(string) {
        var array = string.split(',')
        //console.log(array)
        return array[1];
    }
    $ionicPlatform.ready(function() {
        //console.log(bluetoothSerial)
        $scope.connect()
    })



}