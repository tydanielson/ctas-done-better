/*global angular, window*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', function ($scope, $http, $state) {

            $scope.cta = {};

            //will probably want to resolve this data before hand.
            $scope.ctalist = [];
            $http({
                method: 'GET',
                url : 'api/cta'
            }).then(function (res) {
                $scope.ctalist = res.data.ctalist;
            });

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
                        name: 'ID',
                        field: '_id'
                    },
                    {
                        name: 'Action',
                        cellTemplate: `<md-button class="md-fab md-mini" ng-click="grid.appScope.editcta(row)"><md-icon>edit</md-icon></md-button>
                        <md-button class="md-fab md-mini" ng-click="grid.appScope.deletecta(row)"><md-icon>delete</md-icon></md-button>`
                    }
                ],
                rowHeight : 50
            };

            $scope.savecta = function () {
                var method = angular.isUndefined($scope.cta._id) === true ? 'POST':'PUT';
                $http({
                    method: method,
                    url : 'api/cta/save',
                    data : $scope.cta
                });

                $state.go('main.list');
            };

            $scope.editcta = function (row) {
                $http({
                    method: 'GET',
                    url : 'api/cta/' + row.entity._id
                }).then(function (res) {
                    $scope.cta = res.data.cta;
                    $state.go('main.edit');
                });
            }

            $scope.deletecta = function (row) {
                $http({
                    method: 'DELETE',
                    url : 'api/cta/' + row.entity._id,
                });

                var index = $scope.ctalist.indexOf(row.entity);
                $scope.ctalist.splice(index, 1);
            };

            $scope.creatNewCta = function() {
                $scope.cta = {};
                $state.go('main.edit');
            }

            $scope.back = function() {
                window.history.back();
            }

        });

}());