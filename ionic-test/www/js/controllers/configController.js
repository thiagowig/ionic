angular.module('starter.controllers')

    .controller('ConfigController', function ($scope, $ionicPopup, PaymentMethodService) {

        var findPaymenMethods = function () {
            PaymentMethodService.findAll(function(result) {
                $scope.paymentMethods = [];

                for (var i = 0; i < result.rows.length; i++) {
                    $scope.paymentMethods.push(result.rows.item(i));
                }
            })
        };

        $scope.changePaymentMethod = function (idPaymentMethod) {
            PaymentMethodService.findConfigByPaymentMethod(idPaymentMethod, function(result) {
                $scope.paymentMethodConfig = result.rows.item(0);
            });
        };

        $scope.save = function (paymentMethodConfig) {
            if (paymentMethodConfig) {
                PaymentMethodService.updateConfig(paymentMethodConfig, function(result) {
                    $ionicPopup.alert({
                        title: '<font color="green"><b>Sucesso</b></font>',
                        template: 'As configurações foram salvas'
                    });
                });

            } else {
                $ionicPopup.alert({
                    title: '<font color="red"><b>Erro</b></font>',
                    template: 'Favor selecionar uma forma de pagamento'
                });
            }
        };

        findPaymenMethods();
    });
