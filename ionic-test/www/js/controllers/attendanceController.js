angular.module('starter.controllers')

  .controller('AttendanceController', function ($scope, PopupService, PaymentMethodService, AttendanceService) {

    var findPaymenMethods = function () {
      PaymentMethodService.findAll(function (result) {
        $scope.paymentMethods = result;
      })
    };

    $scope.save = function (attendance, paymentMethod) {
      attendance.idPaymentMethod = paymentMethod.id;

      AttendanceService.save(attendance, function (arguments) {
        PopupService.sucess('Data saved');
      });
    }


    findPaymenMethods();

  });