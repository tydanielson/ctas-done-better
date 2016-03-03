/*global angular*/
(function () {
    'use strict';

    angular
        .module('app', [
            'ngMaterial',
            'ui.router',
            'ui.tinymce',
            'ui.grid'
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
                        }
                    }
                })
                .state('main.create', {
                    url: '/list',
                    views: {
                        'list': {
                            templateUrl: 'partials/createcta.html',
                        }
                    }
                });
        });
}());