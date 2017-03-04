angular.module('starter.services')

    .service('DateService', function ($rootScope, $ionicPopup, ConfigService) {

        this.calculateExpectedPaymentDate = function (idPaymentMethod, installments) {
            if (idPaymentMethod === 1 || idPaymentMethod === 2) {
                var paymentDayOfWeek = parseInt($rootScope.configuration.paymentDayOfWeek)
                var now = new Date();
                now.setDate(now.getDate() + (paymentDayOfWeek + (7 - now.getDay())) % 7);

                return now;

            } else {
                // TODO Implement installments
                return null
            }
        }
    })
