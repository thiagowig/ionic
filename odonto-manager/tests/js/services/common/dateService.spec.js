


describe('dateService.spec.js', function () {
    var DateService;
    var $cordovaSQLite;

    beforeEach(module('starter.services'));

    beforeEach(inject(function (_DateService_, _ConfigService_) {
        DateService = _DateService_
        ConfigService = _ConfigService_
    }));

    it('can get an instance of my factory', inject(function(DateService, ConfigService) {
        expect(DateService).toBeDefined();
    }));
});
