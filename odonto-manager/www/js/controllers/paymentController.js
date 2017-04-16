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

    $scope.model = {checkAll: false}

    $scope.checkSingle = function (checked) {
      if (!checked) {
        $scope.model.checkAll = false
      } else {
        var allInstallmentsChecked = $scope.installments.every(function (installment) {
          return installment.checked
        })

        if (allInstallmentsChecked) {
          $scope.model.checkAll = true
        }
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

    $scope.roundValue = function (value) {
      return TaxService.roundValue(value)
    }
  })
