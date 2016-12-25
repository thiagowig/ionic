angular.module('starter.services')

    .service('AttendanceService', function ($cordovaSQLite, PopupService) {

        /*
            Save the attendance
        */
        this.save = function (attendance, callback) {
            var query = 'INSERT INTO attendance (idPaymentMethod, patient, fullValue) VALUES (?, ?, ?)';
            var params = [attendance.idPaymentMethod, attendance.patient, attendance.fullValue];

            $cordovaSQLite.execute(db, query, params).then(function (result) {
                callback(result);

            }, function (error) {
                PopupService.error('Ocorreu um erro ao salvar o atendimento: ' + error);
            });
        }
    });