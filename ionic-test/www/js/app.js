// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var db = null

angular.module('starter', ['ionic', 'ion-fab-button', 'starter.controllers', 'starter.services', 'starter.routes', 'starter.directives', 'ngCordova'])

  .run(function ($ionicPlatform, $cordovaSQLite, $rootScope) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
        cordova.plugins.Keyboard.disableScroll(true)
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault()
      }

      db = $cordovaSQLite.openDB({ name: 'gac.db', iosDatabaseLocation: 'default' })

      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS paymentMethod (id INTEGER PRIMARY KEY, name TEXT)')
        tx.executeSql('CREATE TABLE IF NOT EXISTS paymentMethodConfig (id INTEGER PRIMARY KEY, idPaymentMethod INTEGER, clinicTax NUMBER, machineTax NUMBER, FOREIGN KEY(idPaymentMethod) REFERENCES paymentMethod(id)) ')
        tx.executeSql('CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY, idPaymentMethod INTEGER NOT NULL, patient TEXT NOT NULL, installments INTEGER NOT NULL, attendanceDate LONG NOT NULL, fullValue REAL NOT NULL, receiveValue REAL NOT NULL, machineTaxValue REAL NOT NULL, clinicValue REAL NOT NULL, paid INTEGER, obs TEXT, FOREIGN KEY(idPaymentMethod) REFERENCES paymentMethod(id))')
        tx.executeSql('CREATE TABLE IF NOT EXISTS installment (id INTEGER PRIMARY KEY, idAttendance INTEGER NOT NULL, number INTEGER NOT NULL, value REAL NOT NULL, paid INTEGER, expectedPaymentDate LONG, paymentDate LONG, FOREIGN KEY(idAttendance) REFERENCES attendance(id)) ')
        tx.executeSql('CREATE TABLE IF NOT EXISTS configuration (id INTEGER PRIMARY KEY, name patient TEXT, value TEXT)')

        tx.executeSql('SELECT * FROM paymentMethod', [], function (tx, res) {
          if (res.rows.length === 0) {
            var paymentMethods = [
              { id: 1, name: 'Dinheiro', clinicTax: 55, machineTax: 0 },
              { id: 2, name: 'Debito', clinicTax: 55, machineTax: 2.5 },
              { id: 3, name: 'Credito', clinicTax: 55, machineTax: 4 }
            ]

            paymentMethods.forEach(function (element) {
              var insertPaymentQuery = 'INSERT INTO paymentMethod (id, name) VALUES (?, ?)'
              var insertPaymentValue = [element.id, element.name]
              tx.executeSql(insertPaymentQuery, insertPaymentValue)

              var insertConfigQuery = 'INSERT INTO paymentMethodConfig (id, idPaymentMethod, clinicTax, machineTax) VALUES (?, ?, ?, ?)'
              var insertConfigValue = [element.id, element.id, element.clinicTax, element.machineTax]
              tx.executeSql(insertConfigQuery, insertConfigValue)
            })
          }
        })

        tx.executeSql('SELECT * FROM configuration', [], function (tx, result) {
          $rootScope.configuration = {}

          if (result.rows.length === 0) {
            var configurations = [
              { name: 'paymentDayOfWeek', value: 3 }
            ]

            configurations.forEach(function (configuration) {
              $rootScope.configuration[configuration.name] = configuration.value

              var query = 'INSERT INTO configuration (name, value) VALUES (?, ?)'
              var params = [configuration.name, configuration.value]
              tx.executeSql(query, params)
            })
          } else {
            for (var i = 0; i < result.rows.length; i++) {
              var configuration = result.rows.item(i)

              $rootScope.configuration[configuration.name] = configuration.value
            }
          }

        })
      }, function (error) {
        console.log('Ocorreu um erro ao criar o banco de dados: ' + error)
      }, function () {
        console.log('Banco de dados criado com sucesso')
      })
    })
  })

angular.module('starter.controllers', [])

angular.module('starter.directives', [])

angular.module('starter.services', [])

angular.module('starter.routes', [])
