angular.module('starter.services')

  .service('InstallmentService', function ($cordovaSQLite, DateService) {
    /**
     *
     */
    this.findAllToReceive = function (callback) {
      var query = 'SELECT expectedPaymentDate, sum(value) AS total, paid, count(*) AS totalCount FROM installment WHERE (paid IS NULL OR paid <> 1) GROUP BY expectedPaymentDate ORDER BY expectedPaymentDate'

      $cordovaSQLite.execute(db, query).then(function (result) {
        var payments = []

        for (var i = 0; i < result.rows.length; i++) {
          payments.push(result.rows.item(i))
        }

        callback(null, payments)
      }, function (err) {
        callback(err)
      })
    }

    /**
     *
     */
    this.getTotalToReceive = function (callback) {
      var query = 'SELECT sum(value) AS totalValue, count(*) AS totalCount FROM installment WHERE (paid IS NULL OR paid <> 1) '

      $cordovaSQLite.execute(db, query).then(function (result) {
        callback(null, result.rows.item(0))
      }, function (err) {
        callback(err)
      })
    }

    /**
     *
     */
    this.findByExpectedPaymentDate = function (expectedPaymentDate, callback) {
      var query = 'SELECT installment.*, attendance.patient, attendance.installments, attendance.fullValue, attendance.machineTaxValue, attendance.idPaymentMethod, attendance.attendanceDate FROM installment installment INNER JOIN attendance attendance ON attendance.id = installment.idAttendance WHERE installment.expectedPaymentDate = ? AND (installment.paid IS NULL OR installment.paid <> 1)'
      var param = [expectedPaymentDate]

      $cordovaSQLite.execute(db, query, param).then(function (result) {
        var installments = []

        for (var i = 0; i < result.rows.length; i++) {
          var installment = result.rows.item(i)
          installment.machineValue = (installment.fullValue - installment.machineTaxValue) / installment.installments

          installments.push(installment)
        }

        callback(null, installments)
      }, function (err) {
        callback(err)
      })
    }

    /**
     *
     */
    this.generateBackup = function (callback) {
      var query = 'SELECT installment.*, attendance.patient, attendance.installments, attendance.fullValue, attendance.machineTaxValue, attendance.idPaymentMethod, attendance.attendanceDate FROM installment installment INNER JOIN attendance attendance ON attendance.id = installment.idAttendance WHERE (installment.paid IS NULL OR installment.paid <> 1) ORDER BY expectedPaymentDate'

      $cordovaSQLite.execute(db, query, []).then(function (result) {
        var installments = []

        for (var i = 0; i < result.rows.length; i++) {
          var installment = result.rows.item(i)
          installment.machineValue = (installment.fullValue - installment.machineTaxValue) / installment.installments

          installments.push(installment)
        }

        callback(null, installments)
      }, function (err) {
        callback(err)
      })
    }

    /**
     * Pay a installment
     */
    this.payInstallments = function (paidInstallmentsId, callback) {
      var whereSize = getWhereSize(paidInstallmentsId)
      var paymentDate = DateService.getCurrentDate()

      var query = 'UPDATE installment SET paid = 1, paymentDate = ? WHERE id IN (' + whereSize + ') '
      var param = [paymentDate]
      param = param.concat(paidInstallmentsId)

      $cordovaSQLite.execute(db, query, param).then(function (result) {
        if (paidInstallmentsId.length !== result.rowsAffected) {
          callback('rowsAffected: ' + result.rowsAffected)
        } else {
          callback()
        }
      }, function (err) {
        callback(err)
      })
    }

    function getWhereSize (paidInstallmentsId) {
      var where = ''

      paidInstallmentsId.forEach(function (id) {
        where += '?, '
      })

      return where.substr(0, where.length - 2)
    }
  })
