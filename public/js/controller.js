/*global angular, window*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', function ($scope, $http) {

            $http({
                method: 'GET',
                url : 'api/ctas'
            }).then(function (res) {
                $scope.ctalist = res.data.ctalist;
            });

        });

}());