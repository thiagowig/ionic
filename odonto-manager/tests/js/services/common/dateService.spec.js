/**
 * The tests for DateService.
 */
describe('dateService.spec.js', function () {

    beforeEach(module('starter.services'));

    beforeEach(function () {
        module(function ($provide) {
            var rootScope = {
                configuration: {
                    paymentDayOfWeek: 3
                }
            }
            $provide.value('$rootScope', rootScope);
        });
    });

    it('must return return 22/03/2017', inject(function (DateService) {
        var dayRange = [20, 21]

        dayRange.forEach(function (day) {
            var currentDate = {
                year: 2017,
                month: 2,
                day: day
            }

            var expectedDate = {
                year: 2017,
                month: 2,
                day: 22
            }

            assertDate(DateService, currentDate, expectedDate)
        })
    }));

    it('must return return 29/03/2017', inject(function (DateService) {
        var dayRange = [22, 23, 24, 25, 26, 27, 28]

        dayRange.forEach(function (day) {
            var currentDate = {
                year: 2017,
                month: 2,
                day: day
            }

            var expectedDate = {
                year: 2017,
                month: 2,
                day: 29
            }

            assertDate(DateService, currentDate, expectedDate)
        })
    }));

    it('must return return 05/04/2017', inject(function (DateService) {
        var dayRange = [29, 30]

        dayRange.forEach(function (day) {
            var currentDate = {
                year: 2017,
                month: 2,
                day: day
            }

            var expectedDate = {
                year: 2017,
                month: 3,
                day: 05
            }

            assertDate(DateService, currentDate, expectedDate)
        })
    }));

    it('must return return 05/04/2017', inject(function (DateService) {
        var dayRange = [20, 21, 22, 23, 24, 25]

        dayRange.forEach(function (day) {
            var currentDate = {
                year: 2017,
                month: 2,
                day: day
            }

            var expectedDate = {
                year: 2017,
                month: 3,
                day: 26
            }

            assertDate(DateService, currentDate, expectedDate, 1)
        })
    }));

    function assertDate(DateService, currentDate, expectedDate, installment) {
        var baseTime = new Date(currentDate.year, currentDate.month, currentDate.day)

        jasmine.clock().mockDate(baseTime)

        var resultTimestamp = DateService.calculateExpectedPaymentDate(installment)
        var resultDate = new Date(resultTimestamp)

        console.log('########## ' + resultDate)
        expect(resultDate.getFullYear()).toBe(expectedDate.year);
        expect(resultDate.getMonth()).toBe(expectedDate.month);
        expect(resultDate.getDate()).toBe(expectedDate.day);
    }
});
