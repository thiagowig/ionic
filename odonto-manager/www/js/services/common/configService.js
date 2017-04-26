angular.module('starter.services')

  .service('ConfigService', function ($cordovaSQLite, InstallmentService, $cordovaFile) {
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

    /**
     * 
     */
    this.generateBackup = function (callback) {
      InstallmentService.generateBackup(function (err, result) {
        if (err) {
          callback(err)
        } else {
          var backup = 'Paciente,Valor a receber\n'

          result.forEach(function (installment) {
            backup += installment.patient + ',' + installment.value + '\n'
          })

          $cordovaFile.writeFile(cordova.file.externalDataDirectory, 'backup.csv', backup, true)
            .then(function (result) {
              callback(null, cordova.file.externalDataDirectory)
            }, function (err) {
              callback(err)
            })
        }
      })
    }

  })
