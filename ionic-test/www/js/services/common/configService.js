angular.module('starter.services')

    .service('ConfigService', function ($cordovaSQLite) {
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
    })
