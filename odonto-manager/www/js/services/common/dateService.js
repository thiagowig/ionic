angular.module('starter.services')

  .service('DateService', function ($rootScope) {
    this.calculateExpectedPaymentDate = function (installment) {
      var paymentDayOfWeek = parseInt($rootScope.configuration.paymentDayOfWeek)
      var paymentDate = new Date()

      if (!installment) {
        paymentDate.setDate(paymentDate.getDate() + 1)
        paymentDate.setDate(paymentDate.getDate() + (paymentDayOfWeek + (7 - paymentDate.getDay())) % 7)

        return paymentDate.getTime()
      } else {
        paymentDate.setMonth(paymentDate.getMonth() + installment)

        return paymentDate.setDate(paymentDate.getDate() + (paymentDayOfWeek + (7 - paymentDate.getDay())) % 7)
      }
    }
  })
