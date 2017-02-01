angular.module('starter.services')

    .service('AttendanceService', function ($cordovaSQLite, PopupService) {

        /**
         * Save the attendance
         */
        this.save = function (attendance, callback) {
            var query;
            var params;

            if (attendance.id) {
                query = 'UPDATE attendance SET idPaymentMethod = ?, patient = ?, fullValue = ?, obs = ?, machineTaxValue = ?, clinicValue = ?, receiveValue = ? WHERE id = ?';
                params = [attendance.idPaymentMethod, attendance.patient, attendance.fullValue, attendance.obs, attendance.id, attendance.machineTaxValue, attendance.clinicValue, attendance.receiveValue];
            } else {
                attendance.attendanceDate = new Date().getTime();
                query = 'INSERT INTO attendance (idPaymentMethod, patient, fullValue, obs, attendanceDate, machineTaxValue, clinicValue, receiveValue) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                params = [attendance.idPaymentMethod, attendance.patient, attendance.fullValue, attendance.obs, attendance.attendanceDate, attendance.machineTaxValue, attendance.clinicValue, attendance.receiveValue];
            }

            $cordovaSQLite.execute(db, query, params).then(function (result) {
                callback(null, result);

            }, function (err) {
                callback(err)                
            });
        }

        /**
         * List all attendances
         */
        this.findAll = function (callback) {
            var query = 'SELECT * FROM attendance ORDER BY attendanceDate DESC';

            $cordovaSQLite.execute(db, query, []).then(function (result) {
                var attendances = [];

                for (var i = 0; i < result.rows.length; i++) {
                    var attendance = result.rows.item(i)
                    attendance.formattedAttendanceDate = new Date(attendance.attendanceDate)

                    attendances.push(attendance);
                }

                callback(null, attendances);

            }, function (err) {
                callback(err)
            })
        }

        /**
         * Find attendance by id
         */
        this.findById = function (attendanceId, callback) {
            var query = 'SELECT * FROM attendance WHERE id = ?'
            var param = [attendanceId]

            $cordovaSQLite.execute(db, query, param).then(function (result) {
                var attendance = result.rows.item(0)
                callback(null, attendance)

            }, function (err) {
                callback(err)
            })
        }

        /**
         * Calculate the tax
         */
        this.calculateTax = function(attendance, callback) {
            var query = 'SELECT * FROM paymentMethodConfig WHERE idPaymentMethod = ?'
            var param = [attendance.idPaymentMethod]

            $cordovaSQLite.execute(db, query, param).then(function (result) {
                var paymentMethodConfig = result.rows.item(0)

                attendance.machineTaxValue = Math.round((attendance.fullValue * paymentMethodConfig.machineTax) / 100)
                attendance.clinicValue = Math.round((attendance.fullValue * paymentMethodConfig.clinicTax) / 100)
                attendance.receiveValue = Math.round(attendance.fullValue - attendance.machineTaxValue - attendance.clinicValue)

                callback(null)

            }, function (err) {
                callback(err)
            })
        }

    });