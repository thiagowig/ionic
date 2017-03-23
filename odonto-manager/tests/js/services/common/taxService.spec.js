/**
 * The tests for TaxService.
 */
describe('taxService.spec.js', function () {

  beforeEach(module('starter.services'));

  it('must calculate rates', inject(function (TaxService) {

    var useCases = [
      {
        attendance: {
          fullValue: 1000
        },
        paymentMethodConfig: {
          machineTax: 0,
          clinicTax: 55
        },
        expected: {
          fullValue: 1000,
          machineTaxValue: 0,
          clinicValue: 550,
          receiveValue: 450,
        }
      }
    ]

    useCases.forEach(function(useCase) {
      TaxService.calculateRates(useCase.attendance, useCase.paymentMethodConfig)

      expect(useCase.attendance.fullValue).toBe(useCase.expected.fullValue)
      expect(useCase.attendance.machineTaxValue).toBe(useCase.expected.machineTaxValue)
      expect(useCase.attendance.clinicValue).toBe(useCase.expected.clinicValue)
      expect(useCase.attendance.receiveValue).toBe(useCase.expected.receiveValue)
    })
  }));

  it('must calculate installment value', inject(function (TaxService) {

    var useCases = [
      { receiveValue: 100, installments: 3, expected: 33.33 },
      { receiveValue: 1000, installments: 4, expected: 250 },
      { receiveValue: 150, installments: 8, expected: 18.75 },
      { receiveValue: 47.55, installments: 3, expected: 15.85 },
    ]

    useCases.forEach(function (attendance) {
      expect(TaxService.calculateInstallmentValue(attendance)).toBe(attendance.expected)
    })
  }));


})