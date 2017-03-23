angular.module('starter.services')

  .service('TaxService', function () {
    
    /**
     * 
     */
    this.calculateRates = function (attendance, paymentMethodConfig) {
      attendance.machineTaxValue = roundValue((attendance.fullValue * paymentMethodConfig.machineTax) / 100)
      attendance.clinicValue = roundValue(((attendance.fullValue - attendance.machineTaxValue) * paymentMethodConfig.clinicTax) / 100)
      attendance.receiveValue = roundValue(attendance.fullValue - attendance.machineTaxValue - attendance.clinicValue)

      return attendance;
    }

    /**
     * 
     */
    this.calculateInstallmentValue = function (attendance) {
      return roundValue(attendance.receiveValue / attendance.installments);
    }
  })

function roundValue(value) {
  return Math.round(value * 100) / 100
}
