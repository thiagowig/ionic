angular.module('starter.controllers')

  .controller('AttendanceListController', function ($scope, PopupService, PaymentMethodService, AttendanceService) {

    var findAttendances = function () {
      AttendanceService.findAll(function (err, result) {
        if (err) {
          PopupService.error('Ocorreu um erro ao buscar os atendimentos: ' + err);

        } else {
          $scope.attendances = result;
        }
      })
    };

    $scope.save = function (attendance, paymentMethod) {
      attendance.idPaymentMethod = paymentMethod.id;

      AttendanceService.save(attendance, function (arguments) {
        PopupService.sucess('Data saved');
      });
    }

    findAttendances();

  });