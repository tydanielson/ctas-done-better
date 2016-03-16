/*global angular, window*/
(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListController', function ($scope, $http, $state) {

            //will probably want to resolve this data before hand.
            $scope.ctalist = [];
            $http({
                method: 'GET',
                url : 'api/cta'
            }).then(function (res) {
                $scope.ctalist = res.data.ctalist;
            });

            $scope.gridOptions = {
                data: 'ctalist',
                enableFiltering: true,
                columnDefs: [
                    {
                        name: 'Name',
                        field: 'name'
                    },
                    {
                        name: 'Description',
                        field: 'desc',
                        enableFiltering: false
                    },
                    {
                        name: 'ID',
                        field: '_id',
                        enableFiltering: false
                    },
                    {
                        name: 'Action',
                        cellTemplate:
                            `
                            <md-button class="md-fab md-mini" ng-click="grid.appScope.editcta(row)">
                                <md-icon>edit</md-icon>
                            </md-button>
                            <md-button class="md-fab md-mini" ng-click="grid.appScope.deletecta(row)">
                                <md-icon>delete</md-icon>
                            </md-button>
                            <md-button class="md-fab md-mini" ng-click="grid.appScope.clonecta(row)">
                                <md-icon>content_copy</md-icon>
                            </md-button>
                            `,
                        enableFiltering: false
                    }
                ],
                rowHeight : 50
            };

            $scope.editcta = function (row) {
                $state.go('main.edit', {id : row.entity._id});
            }

            $scope.deletecta = function (row) {
                //delete from the database
                $http({
                    method: 'DELETE',
                    url : 'api/cta/' + row.entity._id,
                });

                //delete from ui-grid
                var index = $scope.ctalist.indexOf(row.entity);
                $scope.ctalist.splice(index, 1);
            };

            $scope.creatNewCta = function() {
                $scope.cta = {};
                $state.go('main.edit');
            }

        });

}());