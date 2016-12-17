angular.module('starter.controllers')

  .controller('AttendanceController', function ($scope, $ionicPopup, PaymentMethodService, AttendanceService) {

    var findPaymenMethods = function () {
      PaymentMethodService.findAll(function (result) {
        $scope.paymentMethods = result;
      })
    };

    $scope.save = function (attendance, paymentMethod) {
      attendance.idPaymentMethod = paymentMethod.id;

      AttendanceService.save(attendance, function (arguments) {
        $ionicPopup.alert({
          title: '<font color="green"><b>Sucesso</b></font>',
          template: 'Data saved'
        });
      });
    }


    findPaymenMethods();

  });