angular.module('starter.services')

    .service('PaymentMethodService', function($cordovaSQLite) {
        
        this.findAll = function(callback) {
            var findAllQuery = "SELECT * FROM paymentMethod";

            $cordovaSQLite.execute(db, findAllQuery).then(function (result) {
                callback(result);
            });
        }
    })