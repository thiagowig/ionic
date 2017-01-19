angular.module('starter.services')

    .service('AttendanceService', function ($cordovaSQLite, PopupService) {

        /**
         * Save the attendance
         */
        this.save = function (attendance, callback) {
            var query = 'INSERT INTO attendance (idPaymentMethod, patient, fullValue) VALUES (?, ?, ?)';
            var params = [attendance.idPaymentMethod, attendance.patient, attendance.fullValue];

            $cordovaSQLite.execute(db, query, params).then(function (result) {
                callback(null, result);

            }, function (err) {
                PopupService.error('Ocorreu um erro ao salvar o atendimento: ' + err);
            });
        }

        /**
         * List all attendances
         */
        this.findAll = function (callback) {
            var query = 'SELECT * FROM attendance';

            $cordovaSQLite.execute(db, query, []).then(function (result) {
                var attendances = [];

                for (var i = 0; i < result.rows.length; i++) {
                    attendances.push(result.rows.item(i));
                }

                callback(null, attendances);

            }, function (err) {
                callback(err)
            })
        }
    });