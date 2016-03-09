/*global angular, window*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', function ($scope, $http) {

            //will probably want to resolve this data before hand.
            $scope.ctalist = [];
            $http({
                method: 'GET',
                url : 'api/cta'
            }).then(function (res) {
                $scope.ctalist = res.data.ctalist;
            });

            //$scope.cta = ctaData;

            $scope.tinymceOptions = {
                plugins : 'link image table code',
                theme : 'modern'
            };

            $scope.gridOptions = {
                data: 'ctalist',
                columnDefs: [
                    {
                        name: 'Name',
                        field: 'name'
                    },
                    {
                        name: 'Link',
                        field: 'link'
                    },
                    {
                        name: 'Action',
                        cellTemplate: '<md-button class="md-fab md-mini" ng-click="savecta()"><md-icon>edit</md-icon></md-button>'
                    }
                ],
                rowHeight : 50
            };

            $scope.savecta = function () {
                console.log('saving here');
            };

        });

}());