// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

  .run(function ($ionicPlatform, $cordovaSQLite, $ionicPopup) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      db = $cordovaSQLite.openDB({ name: 'my.db', iosDatabaseLocation: 'default' });

      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS paymentMethod (id INTEGER PRIMARY KEY, name TEXT)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS paymentMethodConfig (id INTEGER PRIMARY KEY, idPaymentMethod INTEGER, clinicTax NUMBER, machineTax NUMBER, FOREIGN KEY(idPaymentMethod) REFERENCES paymentMethod(id)) ');

        tx.executeSql('SELECT * FROM paymentMethod', [], function (tx, res) {
          if (res.rows.length == 0) {
            var paymentMethods = [
              { id: 1, name: "Dinheiro", clinicTax: 55, machineTax: 0 },
              { id: 2, name: "Debito", clinicTax: 55, machineTax: 2 },
              { id: 3, name: "Credito", clinicTax: 55, machineTax: 4 }
            ];

            paymentMethods.forEach(function (element) {
              var insertPaymentQuery = 'INSERT INTO paymentMethod (id, name) VALUES (?, ?)';
              var insertPaymentValue = [element.id, element.name];
              tx.executeSql(insertPaymentQuery, insertPaymentValue);

              var insertConfigQuery = 'INSERT INTO paymentMethodConfig (id, idPaymentMethod, clinicTax, machineTax) VALUES (?, ?, ?, ?)';
              var insertConfigValue = [element.id, element.id, element.clinicTax, element.machineTax];
              tx.executeSql(insertConfigQuery, insertConfigValue);
            });
          }
        });

      }, function (error) {
        console.log('Ocorreu um erro ao criar o banco de dados: ' + error);

        $ionicPopup.alert({
          title: '<font color="red"><b>Erro</b></font>',
          template: 'Ocorreu um erro ao iniciar o banco de dados: ' + error
        });

      }, function () {
        console.log('Banco de dados criado com sucesso');
      });
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.attendance', {
        url: '/attendance',
        views: {
          'menuContent': {
            templateUrl: 'templates/attendance.html',
            controller: 'AttendanceController'
          }
        }
      })

      .state('app.receive', {
        url: '/receive',
        views: {
          'menuContent': {
            templateUrl: 'templates/receive.html',
            controller: 'ReceiveController'
          }
        }
      })

      .state('app.payment', {
        url: '/payment',
        views: {
          'menuContent': {
            templateUrl: 'templates/payment.html',
            controller: 'PaymentController'
          }
        }
      })

      .state('app.config', {
        url: '/config',
        views: {
          'menuContent': {
            templateUrl: 'templates/config.html',
            controller: 'ConfigController'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/payment');
  });


angular.module('starter.services', []);