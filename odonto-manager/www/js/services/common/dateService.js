angular.module('starter.services')

  .service('DateService', function ($rootScope) {
    var currentDate = function getCurrentDate () {
      var currentDate = new Date()
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())

      return currentDate
    }

    /**
     *
     */
    this.getCurrentDate = currentDate

    /**
     *
     */
    this.calculateExpectedPaymentDate = function (installment) {
      var paymentDayOfWeek = parseInt($rootScope.configuration.paymentDayOfWeek)
      var paymentDate = currentDate()

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
