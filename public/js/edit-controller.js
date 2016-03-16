/*global angular, window*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditController', function ($scope, $http, $state, cta) {

            $scope.cta = cta;

            $scope.tinymceOptions = {
                plugins : 'link image table code',
                theme : 'modern',
                trusted : true,
                height : 170
            };

            $scope.savecta = function () {
                var method = angular.isUndefined($scope.cta._id) === true ? 'POST' : 'PUT';
                $http({
                    method: method,
                    url : 'api/cta/save',
                    data : $scope.cta
                });

                $state.go('main.list');
            };

            $scope.back = function () {
                window.history.back();
            };

        });

}());