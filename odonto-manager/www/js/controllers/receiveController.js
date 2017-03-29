angular.module('starter.controllers')

  .controller('ReceiveController', function ($scope, $stateParams, PopupService, InstallmentService) {

    InstallmentService.findAllToReceive(function (err, result) {
      if (err) {
        PopupService.error('Erro ao buscar os valores a receber: ' + err)
      } else {
        $scope.installmentsToReceive = result;
      }
    })

    InstallmentService.getTotalToReceive(function (err, result) {
      if (err) {
        PopupService.error('Erro ao buscar o total: ' + err)
      } else {
        $scope.totalToReceive = result;
      }
    })

  })
