angular.module('starter.routes')

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html'
      })

      .state('app.attendance', {
        url: '/attendance/{attendanceId}',
        views: {
          'menuContent': {
            templateUrl: 'templates/attendance.html',
            controller: 'AttendanceController'
          }
        }
      })

      .state('app.attendanceList', {
        url: '/attendanceList',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/attendanceList.html',
            controller: 'AttendanceListController'
          }
        }
      })

      .state('app.receive', {
        url: '/receive',
        cache: false,
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
      })

      .state('app.help', {
        url: '/help',
        views: {
          'menuContent': {
            templateUrl: 'templates/help.html'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/payment')
  })

