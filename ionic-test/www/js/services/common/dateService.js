angular.module('starter.services')

  .service('DateService', function ($rootScope, $ionicPopup, ConfigService) {
    this.calculateExpectedPaymentDate = function (idPaymentMethod, installment) {

      if (!installment) {
        var paymentDayOfWeek = parseInt($rootScope.configuration.paymentDayOfWeek)
        var paymentDate = new Date()
        paymentDate.setDate(paymentDate.getDate() + (paymentDayOfWeek + (7 - paymentDate.getDay())) % 7)

        return paymentDate.getTime()
      } else {
        var today = new Date()

        return today.setMonth(today.getMonth() + installment)
      }
    }
  })
