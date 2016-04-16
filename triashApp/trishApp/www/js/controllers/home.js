angular.module('triash.controllers')
.controller('HomeCtrl',HomeCtrl);
HomeCtrl.$inject = ["$rootScope", "$scope", "$state", "$ionicModal", "$ionicLoading", "$localStorage", "ionicDatePicker"];
function HomeCtrl ($rootScope, $scope, $state, $ionicModal, $ionicLoading, $localStorage, ionicDatePicker){
    

$scope.dateConfig = {
  inputDate: new Date(),
  setLabel: 'Selecciona',
  todayLabel: 'Hoy',
  closeLabel: 'Cerrar',
  mondayFirst: true,
  weeksList: ["S", "L", "M", "M", "J", "V", "S"],
  monthsList: ["Ene", "Feb", "Mar", "Abril", "Mayo", "June¡io", "Julio", "Aug", "Sept", "Oct", "Nov", "Dec"],
  templateType: 'popup',
  from: new Date(1970, 1, 1),
  to: new Date(2018, 8, 1),
  showTodayButton: true,
  dateFormat: 'dd MMMM yyyy',
  closeOnSelect: true
}
// var ipObj1 = {
//         callback: function(val) { //Mandatory
//             console.log('Return value from the datepicker popup is : ' + val, new Date(val));
//             $scope.showDate = new Date(val);
//             //$scope.event.date = val;
//         }
//     };
var ipObj1 = {
        callback: function(val) { //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            $scope.showDate = new Date(val);
            $scope.event.date = val;
        },
        disabledDates: [],
        from: new Date(2016, 03, 27), //Optional
        to: new Date(2016, 04, 28), //Optional
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        disableWeekdays: [1], //Optional
        closeOnSelect: false, //Optional
        templateType: 'popup' //Optional
    };
//ionicDatePickerProvider.configDatePicker($scope.dateConfig);
$scope.openDatePicker = function(){
  ionicDatePicker.openDatePicker(ipObj1);
}



}