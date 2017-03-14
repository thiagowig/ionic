angular.module('starter.controllers')

  .controller('PaymentController', function ($scope, $stateParams) {

    $scope.noMoreItemsAvailable = false;

    $scope.loadMore = function () {
      $scope.items.push({ id: $scope.items.length });

      if ($scope.items.length == 99) {
        $scope.noMoreItemsAvailable = true;
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.items = [];
  })
