angular.module('starter.services')

  .service('ConfigService', function ($cordovaSQLite, InstallmentService, $cordovaFile, DateService) {
    /**
     * Find config by name
     */
    this.find = function (name, callback) {
      var query = 'SELECT * FROM configuration WHERE name = ?'
      var param = [name]

      $cordovaSQLite.execute(db, query, param).then(function (result) {
        var config = result.rows.item(0)
        callback(null, config)
      }, function (err) {
        callback(err)
      })
    }

    /**
     * Find config by name
     */
    this.save = function (name, value, callback) {
      var query = 'UPDATE configuration SET value = ? WHERE name = ?'
      var param = [value, name]

      $cordovaSQLite.execute(db, query, param).then(function (result) {
        if (result.rowsAffected === 1) {
          callback(null)
        } else {
          callback('Nenhuma linha atualizada :\'()')
        }
      }, function (err) {
        callback(err)
      })
    }

    function getPaymentMethodName(idPaymentMethod) {
      if (idPaymentMethod === 1) {
        return 'Dinheiro'
      } else if (idPaymentMethod === 2) {
        return 'Debito'
      } else {
        return 'Credito'
      }
    }

    /**
     *
     */
    this.generateBackup = function (callback) {
      InstallmentService.generateBackup(function (err, result) {
        if (err) {
          callback(err)
        } else {
          var backup = 'Data de pagamento,Paciente,Total do atendimento,Data do atendimento,Forma de pagamento,Parcela,Valor a receber, Valor esquisito,Observaçoes\n'

          result.forEach(function (installment) {
            backup += DateService.formatDate(installment.expectedPaymentDate) + ','
            backup += installment.patient + ','
            backup += installment.fullValue + ','
            backup += DateService.formatDate(installment.attendanceDate) + ','
            backup += getPaymentMethodName(installment.idPaymentMethod) + ','
            backup += installment.number + '/' + installment.installments +  ','
            backup += installment.value + ','
            backup += installment.machineValue + ','            
            backup += installment.obs + '\n'
          })

          $cordovaFile.writeFile(cordova.file.externalDataDirectory, 'backup.csv', backup, true)
            .then(function (result) {
              var dir = cordova.file.externalDataDirectory.substr(cordova.file.externalDataDirectory.indexOf('/Android/'))
              callback(null, dir)
            }, function (err) {
              callback(err)
            })
        }
      })
    }
  })
