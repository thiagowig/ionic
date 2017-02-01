angular.module('starter.controllers')

  .controller('AttendanceController', function ($scope, PopupService, PaymentMethodService, AttendanceService, $stateParams) {

    var findPaymenMethods = function () {
      PaymentMethodService.findAll(function (result) {
        $scope.paymentMethods = result;
      })
    };

    $scope.save = function (attendance, paymentMethod) {
      attendance.idPaymentMethod = paymentMethod.id;

      AttendanceService.calculateTax(attendance, function (err) {
        if (err) {
          PopupService.error('Ocorreu um erro ao salvar o atendimento: ' + err);
        } else {
          AttendanceService.save(attendance, function (err, result) {
            if (err) {
              PopupService.error('Ocorreu um erro ao salvar o atendimento: ' + err);
            } else {
              attendance.id = result.insertId
              PopupService.sucess('Atendimento salvo com sucesso')
            }
          });
        }
      })
    }

    findPaymenMethods();

    if ($stateParams.attendanceId) {
      AttendanceService.findById($stateParams.attendanceId, function (err, attendance) {
        if (err) {
          PopupService.error('Erro ao buscar atendimento: ' + err)
        } else {
          $scope.attendance = attendance

          $scope.paymentMethods.forEach(function (element) {
            if (element.id === attendance.idPaymentMethod) {
              $scope.paymentMethod = element
            }
          });

        }
      })
    }

  });