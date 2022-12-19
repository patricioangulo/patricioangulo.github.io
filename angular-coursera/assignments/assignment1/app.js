(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];


    function LunchCheckController($scope) {

        $scope.dishes = '';

        $scope.tooMuch = () => {

            if ($scope.dishes.length == 0) {
                $scope.message = 'Please enter data first';
                return;
            }
            if ($scope.dishes.split(',').length < 4) {
                $scope.message = 'Enjoy!';
            } else {
                $scope.message = 'Too much!';
            }

        }

    }

})();