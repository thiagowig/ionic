angular.module('starter.controllers')

  .controller('AttendanceController', function ($scope, PopupService, PaymentMethodService, AttendanceService, $stateParams) {

    var findPaymenMethods = function () {
      PaymentMethodService.findAll(function (result) {
        $scope.paymentMethods = result;
      })
    };

    $scope.save = function (attendance, paymentMethod) {
      attendance.idPaymentMethod = paymentMethod.id;

      AttendanceService.save(attendance, function (err, result) {
        if (err) {
          PopupService.error('Ocorreu um erro ao salvar o atendimento: ' + err);
        } else {
          if (result.insertId) {
            attendance.id = result.insertId
          }

          PopupService.sucess('Atendimento salvo com sucesso')
        }
      })
    }

    $scope.calculateTax = function (attendance, paymentMethod) {
      if (attendance && attendance.fullValue && paymentMethod) {
        attendance.idPaymentMethod = paymentMethod.id

        AttendanceService.calculateTax(attendance, function (err) {
          if (err) {
            PopupService.error('Ocorreu um erro ao calcular as taxas: ' + err);
          }
        })
      } else if (attendance) {
        attendance.receiveValue = null
        attendance.machineTaxValue = null
        attendance.clinicValue = null
      }
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