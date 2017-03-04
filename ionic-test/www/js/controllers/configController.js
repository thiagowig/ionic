angular.module('starter.controllers')

  .controller('ConfigController', function ($scope, PopupService, PaymentMethodService, ConfigService) {
    var findPaymenMethods = function () {
      PaymentMethodService.findAll(function (result) {
        $scope.paymentMethods = result
      })
    }

    $scope.changePaymentMethod = function (idPaymentMethod) {
      PaymentMethodService.findConfigByPaymentMethod(idPaymentMethod, function (result) {
        $scope.paymentMethodConfig = result.rows.item(0)
      })
    }

    $scope.savePaymentMethodConfig = function (paymentMethodConfig) {
      PaymentMethodService.updateConfig(paymentMethodConfig, function (result) {
        PopupService.sucess('As taxas foram salvas com sucesso')
      })
    }

    $scope.saveConfiguration = function (configuration) {
      ConfigService.save('paymentDayOfWeek', configuration.paymentDayOfWeek, function (err) {
        if (err) {
          PopupService.sucess('As configurações foram salvas com sucesso')
        } else {
          PopupService.sucess('As configurações foram salvas com sucesso')
        }
      })
    }

    findPaymenMethods()
  })
