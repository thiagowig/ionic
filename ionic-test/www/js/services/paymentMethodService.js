angular.module('starter.services')

    .service('PaymentMethodService', function ($cordovaSQLite, PopupService) {

        /*
            findAll Method
        */
        this.findAll = function (callback) {
            var query = "SELECT * FROM paymentMethod";

            $cordovaSQLite.execute(db, query).then(function (result) {
                var paymentMethods = [];

                for (var i = 0; i < result.rows.length; i++) {
                    paymentMethods.push(result.rows.item(i));
                }

                callback(paymentMethods);
            });
        };

        /*
            findConfigByPaymentMethod Method
        */
        this.findConfigByPaymentMethod = function (idPaymentMethod, callback) {
            var query = 'SELECT * FROM paymentMethodConfig WHERE idPaymentMethod = ?';
            var params = [idPaymentMethod];

            $cordovaSQLite.execute(db, query, params).then(function (result) {
                callback(result);

            }, function (error) {
                PopupService.sucess('Ocorreu um erro ao buscar a forma de pagamento: ' + error);                
            });
        };

        /*
            updateConfig Method
        */
        this.updateConfig = function (paymentMethodConfig, callback) {
            var query = 'UPDATE paymentMethodConfig SET clinicTax = ?, machineTax = ? WHERE id = ?';
            var params = [paymentMethodConfig.clinicTax, paymentMethodConfig.machineTax, paymentMethodConfig.id];

            $cordovaSQLite.execute(db, query, params).then(function (result) {
                callback(result);

            }, function (error) {
                PopupService.sucess('Ocorreu um erro ao atualizar a configuração: ' + error);
            });
        }
    });