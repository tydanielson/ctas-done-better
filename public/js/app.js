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

            // $httpProvider.defaults.useXDomain = true;
            // $httpProvider.defaults.withCredentials = true;
            // delete $httpProvider.defaults.headers.common["X-Requested-With"];
            // $httpProvider.defaults.headers.common["Accept"] = "application/json";
            // $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

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
                        }
                    }
                })
                .state('main.edit', {
                    url: '/edit',
                    views: {
                        'list': {
                            templateUrl: 'partials/editcta.html',
                        }
                    },
                    resolve: {
                        ctaData: function ($http) {
                            return $http({method: 'GET', url: ''});
                        }
                    }
                });
        });
}());