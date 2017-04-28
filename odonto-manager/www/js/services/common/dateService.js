angular.module('starter.services')

  .service('DateService', function ($rootScope) {
    var currentDate = function getCurrentDate() {
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

    /**
     * 
     */
    this.formatDate = function (timestamp) {
      var date = new Date(timestamp);
      var day = date.getDate();

      if (day.toString().length == 1) {
        day = "0" + day;
      }

      var month = date.getMonth() + 1;

      if (month.toString().length == 1) {
        month = "0" + month;
      }
      
      var year = date.getFullYear();

      return day + "/" + month + "/" + year;
    }

  })
