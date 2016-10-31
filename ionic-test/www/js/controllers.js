angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
  })

  .controller('NewController', function ($scope, $stateParams) {
  })

  .controller('ReceiveController', function ($scope, $stateParams) {
  })

  .controller('PaymentController', function ($scope, $stateParams) {
  })

  .controller('ConfigController', function ($scope, $stateParams, $ionicPopup, $cordovaSQLite) {

    var findPaymenMethods = function () {
      var selectQuery = "SELECT * FROM paymentMethod"

      $cordovaSQLite.execute(db, selectQuery).then(function (result) {
        $scope.paymentMethods = [];

        for (var i = 0; i < result.rows.length; i++) {
          $scope.paymentMethods.push(result.rows.item(i));
        }
      });
    };

    $scope.changePaymentMethod = function(paymentMethodId) {
      var selectQuery = "SELECT * FROM paymentMethod WHERE id = ?";

      $cordovaSQLite.execute(db, selectQuery, [paymentMethodId]).then(function (result) {
        $scope.selectedPaymentMethod = result.rows.item(0);
      });
    };

    $scope.save = function (paymentMethod) {
      console.log(paymentMethod);

      if (paymentMethod) {
        var updateQuery = 'UPDATE paymentMethod SET clinicTax = ?, machineTax = ? WHERE id = ?';
        var updateValues = [paymentMethod.clinicTax, paymentMethod.machineTax, paymentMethod.id];

        $cordovaSQLite.execute(db, updateQuery, updateValues).then(function (result) {

          $ionicPopup.alert({
            title: '<font color="green"><b>Sucesso</b></font>',
            template: 'As configurações foram salvas'
          });

        }, function (error) {
          $ionicPopup.alert({
            title: '<font color="red"><b>Erro</b></font>',
            template: 'Ocorreu um erro ao salvar: ' + error
          });
        });

      } else {
        $ionicPopup.alert({
          title: '<font color="red"><b>Erro</b></font>',
          template: 'Favor selecionar uma forma de pagamento'
        });
      }
    }

    findPaymenMethods();
  });
