angular.module('starter.services')

  .service('AttendanceService', function ($cordovaSQLite, PopupService, DateService, TaxService) {
    /**
     * Save the attendance
     */
    this.save = function (attendance, callback) {
      var query
      var params

      if (attendance.id) {
        query = 'UPDATE attendance SET idPaymentMethod = ?, patient = ?, fullValue = ?, obs = ?, machineTaxValue = ?, clinicValue = ?, receiveValue = ?, installments = ? WHERE id = ?'
        params = [attendance.idPaymentMethod, attendance.patient, attendance.fullValue, attendance.obs, attendance.machineTaxValue, attendance.clinicValue, attendance.receiveValue, attendance.installments, attendance.id]
      } else {
        attendance.attendanceDate = new Date().getTime()
        query = 'INSERT INTO attendance (idPaymentMethod, patient, fullValue, obs, attendanceDate, machineTaxValue, clinicValue, receiveValue, installments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        params = [attendance.idPaymentMethod, attendance.patient, attendance.fullValue, attendance.obs, attendance.attendanceDate, attendance.machineTaxValue, attendance.clinicValue, attendance.receiveValue, attendance.installments]
      }

      $cordovaSQLite.execute(db, query, params).then(function (result) {
        if (result.rowsAffected === 1) {
          if (!attendance.id) {
            attendance.id = result.insertId
            insertInstallments()
          } else {
            query = 'DELETE FROM installment WHERE idAttendance = ? '
            params = [attendance.id]

            $cordovaSQLite.execute(db, query, params).then(function (result) {
              insertInstallments()
            }, function (err) {
              callback(err)
            })
          }
        } else {
          callback('Quantidade incorreta de linhas alteradas: ' + result.rowsAffected)
        }
      }, function (err) {
        callback(err)
      })

      var insertInstallments = function () {
        query = 'INSERT INTO installment (idAttendance, number, value, expectedPaymentDate) VALUES '
        params = []

        attendance.installmentsList.forEach(function (installment) {
          query += ' (?, ?, ?, ?),'
          params.push(attendance.id)
          params.push(installment.number)
          params.push(installment.value)
          params.push(installment.expectedPaymentDate)
        })

        query = query.substring(0, query.length - 1)

        $cordovaSQLite.execute(db, query, params).then(function (result) {
          if (result.rowsAffected === attendance.installments) {
            callback(null, result)
          } else {
            callback('Quantidade incorreta de linhas alteradas: ' + result.rowsAffected)
          }
        }, function (err) {
          callback(err)
        })
      }
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
        attendance.installmentsList = []

        query = 'SELECT * FROM installment WHERE idAttendance = ? ORDER BY number'

        $cordovaSQLite.execute(db, query, param).then(function (result) {
          for (var i = 0; i < result.rows.length; i++) {
            var installment = result.rows.item(i)
            attendance.installmentsList.push(installment)
          }

          callback(null, attendance)
        }, function (err) {
          callback(err)
        })
      }, function (err) {
        callback(err)
      })
    }

    var createInstallment = function (number, value, expectedPaymentDate) {
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
        var paymentDate

        attendance = TaxService.calculateRates(attendance, paymentMethodConfig)
        attendance.installmentsList = []

        if (!attendance.installments) {
          paymentDate = DateService.calculateExpectedPaymentDate()
          attendance.installmentsList.push(createInstallment(1, attendance.receiveValue, paymentDate))
          attendance.installments = 1
        } else {
          var installmentValue = TaxService.calculateInstallmentValue(attendance)

          for (var installment = 1; installment <= attendance.installments; installment++) {
            paymentDate = DateService.calculateExpectedPaymentDate(installment)

            attendance.installmentsList.push(createInstallment(installment, installmentValue, paymentDate))
          }
        }

        callback(null)
      }, function (err) {
        callback(err)
      })
    }
  })
