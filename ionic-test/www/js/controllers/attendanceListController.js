angular.module('starter.controllers')

  .controller('AttendanceListController', function ($scope, PopupService, PaymentMethodService, AttendanceService) {

    var findAttendances = function () {
      AttendanceService.findAll(function (err, result) {
        if (err) {
          PopupService.error('Ocorreu um erro ao buscar os atendimentos: ' + err)
        } else {
          $scope.attendances = result
          $scope.noMoreItemsAvailable = false;
          $scope.numberOfItemsToDisplay = 1;
        }
      })
    }

    $scope.loadMore = function () {
      if ($scope.attendances && ($scope.attendances.length > $scope.numberOfItemsToDisplay)) {
        $scope.numberOfItemsToDisplay += 1;
      } else {
        $scope.noMoreItemsAvailable = true
      }

      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    $scope.formatDate = function (dateTime) {
      var date = new Date(dateTime)
      var day = date.getDate()
      if (day.toString().length === 1) {
        day = '0' + day
      }
      var month = date.getMonth() + 1
      if (month.toString().length === 1) {
        month = '0' + month
      }

      return day + '/' + month
    }

    $scope.getIcon = function (attendance) {
      if (attendance.idPaymentMethod === 1) {
        return 'ion-cash'
      } else {
        return 'ion-card'
      }
    }

    $scope.getIconCollor = function (attendance) {
      if (attendance.idPaymentMethod === 1) {
        return 'black'
      } else if (attendance.idPaymentMethod === 2) {
        return 'green'
      } else {
        return 'red'
      }
    }

    $scope.showConfirm = function (attendanceId) {
      PopupService.confirm('Tem certeza que deseja deletar este registro?', function (res) {
        if (res) {
          console.log('YES. Delete it: ' + attendanceId)
        } else {
          console.log('NOOOOO')
        }
      })
    }

    findAttendances()
  })
