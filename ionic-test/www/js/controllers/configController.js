angular.module('starter.controllers')

    .controller('ConfigController', function ($scope, PopupService, PaymentMethodService) {

        var findPaymenMethods = function () {
            PaymentMethodService.findAll(function (result) {
                $scope.paymentMethods = result;
            })
        };

        $scope.changePaymentMethod = function (idPaymentMethod) {
            PaymentMethodService.findConfigByPaymentMethod(idPaymentMethod, function (result) {
                $scope.paymentMethodConfig = result.rows.item(0);
            });
        };

        $scope.save = function (paymentMethodConfig) {
            if (paymentMethodConfig) {
                PaymentMethodService.updateConfig(paymentMethodConfig, function (result) {
                    PopupService.sucess('As configurações foram salvas');
                });

            } else {
                PopupService.error('Favor selecionar uma forma de pagamento');
            }
        };

        findPaymenMethods();
    });
