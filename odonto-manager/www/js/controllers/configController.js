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
        PopupService.success('As taxas foram salvas com sucesso')
      })
    }

    $scope.saveConfiguration = function (configuration) {
      ConfigService.save('paymentDayOfWeek', configuration.paymentDayOfWeek, function (err) {
        if (err) {
          PopupService.error('Erro ao salvar as configurações:' + JSON.stringify(err))
        } else {
          PopupService.success('As configurações foram salvas com sucesso')
        }
      })
    }

    $scope.generateBackup = function() {
      ConfigService.generateBackup(function(err, dir) {
        if (err) {
          PopupService.error('Erro ao gerar o backup:' + JSON.stringify(err))
        } else {
          PopupService.success('Backup salvo com sucesso no diretório: ' + dir)
        }
      })
    }

    findPaymenMethods()
  })
