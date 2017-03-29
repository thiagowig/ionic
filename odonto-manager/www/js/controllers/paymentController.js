angular.module('starter.controllers')

  .controller('PaymentController', function ($scope, $stateParams, InstallmentService, PopupService) {

    var expectedPaymentDate = $stateParams.expectedPaymentDate

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
      });

    }

  })
