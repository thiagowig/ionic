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

    it('must return 22/03/2017', inject(function (DateService) {
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

    it('must return 29/03/2017', inject(function (DateService) {
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

    it('must return 05/04/2017', inject(function (DateService) {
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

    it('must return 26/04/2017 with installment', inject(function (DateService) {
        var dayRange = [20, 21, 22, 23, 24, 25, 26]

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

    it('must return 03/05/2017 with installment', inject(function (DateService) {
        var dayRange = [27, 28, 29, 30]

        dayRange.forEach(function (day) {
            var currentDate = {
                year: 2017,
                month: 2,
                day: day
            }

            var expectedDate = {
                year: 2017,
                month: 4,
                day: 3
            }

            assertDate(DateService, currentDate, expectedDate, 1)
        })
    }));

    it('must return 05/04/2017 with installment', inject(function (DateService) {
        var dayRange = [27, 28, 29, 30]

        dayRange.forEach(function (day) {
            var currentDate = {
                year: 2017,
                month: 2,
                day: day
            }

            var expectedDate = {
                year: 2017,
                month: 4,
                day: 3
            }

            assertDate(DateService, currentDate, expectedDate, 1)
        })
    }));

    it('must return 24/05/2017 with installment', inject(function (DateService) {
        var dayRange = [18, 19, 20, 21, 22, 23, 24]

        dayRange.forEach(function (day) {
            var currentDate = {
                year: 2017,
                month: 2,
                day: day
            }

            var expectedDate = {
                year: 2017,
                month: 4,
                day: 24
            }

            assertDate(DateService, currentDate, expectedDate, 2)
        })
    }));

    it('must return 31/05/2017 with installment', inject(function (DateService) {
        var dayRange = [25, 26, 27, 28]

        dayRange.forEach(function (day) {
            var currentDate = {
                year: 2017,
                month: 2,
                day: day
            }

            var expectedDate = {
                year: 2017,
                month: 4,
                day: 31
            }

            assertDate(DateService, currentDate, expectedDate, 2)
        })
    }));

    it('must return 06/12/2017 with installment', inject(function (DateService) {
        var dayRange = [1, 2, 3, 4, 5, 6]

        dayRange.forEach(function (day) {
            var currentDate = {
                year: 2017,
                month: 2,
                day: day
            }

            var expectedDate = {
                year: 2017,
                month: 11,
                day: 6
            }

            assertDate(DateService, currentDate, expectedDate, 9)
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
