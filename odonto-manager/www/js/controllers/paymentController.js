angular.module('starter.controllers')

  .controller('PaymentController', function ($scope, $stateParams, InstallmentService, PopupService, TaxService) {
    var expectedPaymentDate = $stateParams.expectedPaymentDate
    $scope.expectedPaymentDate = expectedPaymentDate

    InstallmentService.findByExpectedPaymentDate(expectedPaymentDate, function (err, result) {
      if (err) {
        PopupService.error('Erro ao buscar as parcelas: ' + err)
      } else {
        $scope.installments = result
      }
    })

    $scope.checkAllListener = function (checkAll) {
      $scope.installments.forEach(function (installment) {
        installment.checked = checkAll
      })
    }

    $scope.checkSingle = function(checked, checkAll) {
      if (!checked) {
        checkAll = false
        $scope.checkAll = false
      }
    }

    $scope.payInstallments = function () {
      var paidInstallmentsId = $scope.installments
        .filter(function (installment) {
          return installment.checked
        })
        .map(function (installment) {
          return installment.id
        })

      if (paidInstallmentsId.length > 0) {
        InstallmentService.payInstallments(paidInstallmentsId, function (err, result) {
          if (err) {
            PopupService.error('Erro ao salvar o pagamento: ' + JSON.stringify(err))
          } else {
            PopupService.success('Sucesso ao salvar o pagamento')
            $scope.isSaved = true
          }
        })
      } else {
        PopupService.error('Favor selecionar pelo menos 1 registro')
      }
    }

    $scope.roundValue = function(value) {
      return TaxService.roundValue(value)
    }

  })
