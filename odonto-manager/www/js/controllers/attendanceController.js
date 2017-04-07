angular.module('starter.controllers')

  .controller('AttendanceController', function ($scope, PopupService, PaymentMethodService, AttendanceService, $stateParams) {
    $scope.showPaymentDetails = false

    $scope.toggleGroup = function () {
      $scope.showPaymentDetails = !$scope.showPaymentDetails
    }
    $scope.isGroupShown = function () {
      return $scope.showPaymentDetails
    }

    var findPaymenMethods = function () {
      PaymentMethodService.findAll(function (result) {
        $scope.paymentMethods = result
      })
    }

    var isValidAttendance = function (attendance) {
      if (attendance.installments != undefined && (attendance.installments <= 0 || attendance.installments > 30)) {
        PopupService.error('A quantidade de parcelas deve ser entre 1 e 30')

        return false
      }

      return true
    }

    $scope.save = function (attendance, paymentMethod) {
      attendance.idPaymentMethod = paymentMethod.id

      if (isValidAttendance(attendance)) {
        AttendanceService.save(attendance, function (err, result) {
          if (err) {
            PopupService.error('Ocorreu um erro ao salvar o atendimento: ' + err)
          } else {
            PopupService.success('Atendimento salvo com sucesso')
          }
        })
      }
    }

    var mustCalculateTaxesAndDates = function (attendance, paymentMethod) {
      var mustCalculate = attendance && attendance.fullValue && paymentMethod &&
        ((paymentMethod.id === 3 && attendance.installments) || paymentMethod.id !== 3)

      return mustCalculate
    }

    $scope.calculateTaxesAndDates = function (attendance, paymentMethod) {
      if (mustCalculateTaxesAndDates(attendance, paymentMethod)) {
        attendance.idPaymentMethod = paymentMethod.id

        AttendanceService.calculateTaxesAndDates(attendance, function (err) {
          if (err) {
            PopupService.error('Ocorreu um erro ao calcular as taxas: ' + err)
          }
        })
      } else if (attendance) {
        attendance.receiveValue = null
        attendance.machineTaxValue = null
        attendance.clinicValue = null
        attendance.installmentsList = null
      }
    }

    $scope.changePaymentMethod = function (attendance, paymentMethod) {
      if (attendance && attendance.installments) {
        delete attendance.installments
      }

      $scope.calculateTaxesAndDates(attendance, paymentMethod)
    }

    findPaymenMethods()

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
          })
        }
      })
    }
  })
