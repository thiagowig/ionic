angular.module('starter.services')

  .service('DateService', function ($rootScope, $ionicPopup, ConfigService) {
    this.calculateExpectedPaymentDate = function (idPaymentMethod, installment) {
      var paymentDayOfWeek = parseInt($rootScope.configuration.paymentDayOfWeek)
      var paymentDate = new Date()

      if (!installment) {
        paymentDate.setDate(paymentDate.getDate() + 7);
        paymentDate.setDate(paymentDate.getDate() + (paymentDayOfWeek + (7 - paymentDate.getDay())) % 7)

        return paymentDate.getTime()
      } else {
        paymentDate.setMonth(paymentDate.getMonth() + installment)

        return paymentDate.setDate(paymentDate.getDate() + (paymentDayOfWeek + (7 - paymentDate.getDay())) % 7)
      }
    }
  })
