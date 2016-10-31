// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var db = null;  

angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $ionicPopup) {
  $ionicPlatform.ready(function() {
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

    db = $cordovaSQLite.openDB({name: 'my.db', iosDatabaseLocation:'default'});
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS paymentMethod (id INTEGER PRIMARY KEY, name TEXT, clinicTax NUMBER, machineTax NUMBER)')
      .then(function(result) {

        $cordovaSQLite.execute(db, 'SELECT * FROM paymentMethod').then(function(res) {

          if (res.rows.length == 0) {
            var paymentMethods = [
              {id: 1, name: "Dinheiro", clinicTax: 55, machineTax: 0},
              {id: 2, name: "Debito", clinicTax: 55, machineTax: 2},
              {id: 3, name: "Credito", clinicTax: 55, machineTax: 4}
            ];

            paymentMethods.forEach(function(element) {
              var insertQuery = 'INSERT INTO paymentMethod (name, clinicTax, machineTax) VALUES (?, ?, ?)';
              var insertValue = [element.name, element.clinicTax, element.machineTax];

              $cordovaSQLite.execute(db, insertQuery, insertValue);
            });
          }

        });
      });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.new', {
    url: '/new',
    views: {
      'menuContent': {
        templateUrl: 'templates/new.html',
        controller: 'NewController'
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
