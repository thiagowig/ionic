angular.module('starter.controllers')

  .controller('ReceiveController', function ($scope, $stateParams, PopupService, InstallmentService, TaxService) {
    InstallmentService.findAllToReceive(function (err, result) {
      if (err) {
        PopupService.error('Erro ao buscar os valores a receber: ' + err)
      } else {
        $scope.installmentsToReceive = result
      }
    })

    $scope.roundValue = function (value) {
      return TaxService.roundValue(value)
    }
  })
