angular.module('starter.services')

    .service('InstallmentService', function ($cordovaSQLite) {

        /**
         *  
         */
        this.findAllToReceive = function (callback) {
            var query = 'SELECT expectedPaymentDate, sum(value) AS total, paid FROM installment WHERE (paid IS NULL OR paid <> 1) GROUP BY expectedPaymentDate ORDER BY expectedPaymentDate, paid'

            $cordovaSQLite.execute(db, query).then(function (result) {
                var payments = []

                for (var i = 0; i < result.rows.length; i++) {
                    payments.push(result.rows.item(i))
                }

                callback(null, payments)

            }, function (err) {
                callback(err)
            })
        }
    })
