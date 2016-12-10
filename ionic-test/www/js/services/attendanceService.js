angular.module('starter.services')

    .service('AttendanceService', function ($cordovaSQLite) {

        /*
            findAll Method
        */
        this.findAll = function (callback) {
            var query = "SELECT * FROM paymentMethod";

            $cordovaSQLite.execute(db, query).then(function (result) {
                callback(result);
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
                $ionicPopup.alert({
                    title: '<font color="red"><b>Erro</b></font>',
                    template: 'Ocorreu um erro ao buscar a forma de pagamento: ' + error
                });
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
                $ionicPopup.alert({
                    title: '<font color="red"><b>Erro</b></font>',
                    template: 'Ocorreu um erro ao atualizar a configuração: ' + error
                });
            });
        }
    })