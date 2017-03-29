angular.module('starter.services')

  .service('PopupService', function ($ionicPopup) {
    function showMessage (color, header, message) {
      $ionicPopup.alert({
        title: '<font color="' + color + '"><b>' + header + '</b></font>',
        template: message
      })
    }

    this.error = function (message) {
      showMessage('red', 'Erro', message)
    }

    this.success = function (message) {
      showMessage('green', 'Sucesso', message)
    }

    this.confirm = function (message, callback) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirmação',
        template: message
      })

      confirmPopup.then(callback)
    }
  })
