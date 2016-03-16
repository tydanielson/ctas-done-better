/*global angular*/
(function () {
    'use strict';

    angular
        .module('app', [
            'ngMaterial',
            'ui.router',
            'ui.tinymce',
            'ui.grid',
            'ui.ace',
            'ngSanitize'
        ])
        .config(function ($urlRouterProvider, $stateProvider) {

            $urlRouterProvider.otherwise('/list');
            $stateProvider
                .state('main', {
                    abstract : true,
                    views: {
                        'main': {
                            templateUrl: 'partials/main.html',
                            controller: 'MainController'
                        }
                    }
                })
                .state('main.list', {
                    url: '/list',
                    views: {
                        'list': {
                            templateUrl: 'partials/listcta.html',
                            controller: 'ListController'
                        }
                    }
                })
                .state('main.edit', {
                    url: '/edit/:id',
                    views: {
                        'list': {
                            templateUrl: 'partials/editcta.html',
                            controller: 'EditController'
                        }
                    },
                    resolve: {
                        cta: function ($http, $stateParams) {
                            return $http({
                                method: 'GET',
                                url : 'api/cta/' + $stateParams.id
                            }).then(function (res) {
                                return res.data.cta;
                            });
                        }
                    }
                });
        });
}());