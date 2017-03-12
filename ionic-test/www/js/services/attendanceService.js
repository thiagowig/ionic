angular.module('starter.services')

    .service('AttendanceService', function ($cordovaSQLite, PopupService, DateService) {
        /**
         * Save the attendance
         */
      this.save = function (attendance, callback) {
        var query
        var params

        if (attendance.id) {
          query = 'UPDATE attendance SET idPaymentMethod = ?, patient = ?, fullValue = ?, obs = ?, machineTaxValue = ?, clinicValue = ?, receiveValue = ?, expectedPaymentDate = ? WHERE id = ?'
          params = [attendance.idPaymentMethod, attendance.patient, attendance.fullValue, attendance.obs, attendance.machineTaxValue, attendance.clinicValue, attendance.receiveValue, attendance.expectedPaymentDate, attendance.id]
        } else {
          attendance.attendanceDate = new Date().getTime()
          query = 'INSERT INTO attendance (idPaymentMethod, patient, fullValue, obs, attendanceDate, machineTaxValue, clinicValue, receiveValue, expectedPaymentDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
          params = [attendance.idPaymentMethod, attendance.patient, attendance.fullValue, attendance.obs, attendance.attendanceDate, attendance.machineTaxValue, attendance.clinicValue, attendance.receiveValue, attendance.expectedPaymentDate]
        }

        $cordovaSQLite.execute(db, query, params).then(function (result) {
          if (result.rowsAffected === 1) {
            if (!attendance.id) {
              attendance.id = result.insertId
            }

            callback(null, result)
          } else {
            callback('Quantidade incorreta de linhas alteradas: ' + result.rowsAffected)
          }
        }, function (err) {
          callback(err)
        })
      }

        /**
         * List all attendances
         */
      this.findAll = function (callback) {
        var query = 'SELECT * FROM attendance ORDER BY attendanceDate DESC'

        $cordovaSQLite.execute(db, query, []).then(function (result) {
          var attendances = []

          for (var i = 0; i < result.rows.length; i++) {
            var attendance = result.rows.item(i)
            attendance.formattedAttendanceDate = new Date(attendance.attendanceDate)

            attendances.push(attendance)
          }

          callback(null, attendances)
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

      var createInstallment = function(number, value, expectedPaymentDate) {
        return {
          number: number,
          value: value,
          expectedPaymentDate: expectedPaymentDate
        }
      }

        /**
         * Calculate the tax and payment date
         */
      this.calculateTaxesAndDates = function (attendance, callback) {
        var query = 'SELECT * FROM paymentMethodConfig WHERE idPaymentMethod = ?'
        var param = [attendance.idPaymentMethod]

        $cordovaSQLite.execute(db, query, param).then(function (result) {
          var paymentMethodConfig = result.rows.item(0)

          attendance.machineTaxValue = roundValue((attendance.fullValue * paymentMethodConfig.machineTax) / 100)
          attendance.clinicValue = roundValue(((attendance.fullValue - attendance.machineTaxValue) * paymentMethodConfig.clinicTax) / 100)
          attendance.receiveValue = roundValue(attendance.fullValue - attendance.machineTaxValue - attendance.clinicValue)
          attendance.installmentsList = []

          if (!attendance.installments) {
            var paymentDate = DateService.calculateExpectedPaymentDate(attendance.idPaymentMethod)
            attendance.installmentsList.push(createInstallment(1, attendance.receiveValue, paymentDate))
          } else {
            for (var installment = 1; installment <= attendance.installments; installment++) {
              var paymentDate = DateService.calculateExpectedPaymentDate(attendance.idPaymentMethod, installment)
              var installmentValue = roundValue(attendance.receiveValue / attendance.installments)
              attendance.installmentsList.push(createInstallment(installment, installmentValue, paymentDate))
            }
          }
 
          attendance.expectedPaymentDate = DateService.calculateExpectedPaymentDate(attendance.idPaymentMethod, attendance.installments)[0]
          if (attendance.expectedPaymentDate) {
            attendance.expectedPaymentDate = attendance.expectedPaymentDate.getTime()
          }

          callback(null)
        }, function (err) {
          callback(err)
        })
      }
    })

function roundValue (value) {
  return Math.round(value * 100) / 100
}
