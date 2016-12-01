angular.module('starter.controllers')

    .controller('ConfigController', function ($scope, $stateParams, $ionicPopup, $cordovaSQLite) {

        var findPaymenMethods = function () {
            var selectQuery = "SELECT * FROM paymentMethod"

            $cordovaSQLite.execute(db, selectQuery).then(function (result) {
                $scope.paymentMethods = [];

                for (var i = 0; i < result.rows.length; i++) {
                    $scope.paymentMethods.push(result.rows.item(i));
                }
            });
        };

        $scope.changePaymentMethod = function (idPaymentMethod) {
            var query = 'SELECT * FROM paymentMethodConfig WHERE idPaymentMethod = ?';
            var params = [idPaymentMethod];

            $cordovaSQLite.execute(db, query, params).then(function (result) {
                $scope.paymentMethodConfig = result.rows.item(0);

            }, function (error) {
                $ionicPopup.alert({
                    title: '<font color="red"><b>Erro</b></font>',
                    template: 'Ocorreu um erro ao buscar a forma de pagamento: ' + error
                });
            });
        };

        $scope.save = function (paymentMethodConfig) {
            console.log(paymentMethodConfig);

            if (paymentMethodConfig) {
                var updateQuery = 'UPDATE paymentMethodConfig SET clinicTax = ?, machineTax = ? WHERE id = ?';
                var updateValues = [paymentMethodConfig.clinicTax, paymentMethodConfig.machineTax, paymentMethodConfig.id];

                $cordovaSQLite.execute(db, updateQuery, updateValues).then(function (result) {

                    $ionicPopup.alert({
                        title: '<font color="green"><b>Sucesso</b></font>',
                        template: 'As configurações foram salvas'
                    });

                }, function (error) {
                    $ionicPopup.alert({
                        title: '<font color="red"><b>Erro</b></font>',
                        template: 'Ocorreu um erro ao salvar: ' + error
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
