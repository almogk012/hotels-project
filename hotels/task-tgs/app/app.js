(function () {
    'use strict';

    angular.module('app',['ui.router','ngAnimate','ui.bootstrap']);

    angular.module('app').config(['$stateProvider', '$urlRouterProvider','$compileProvider',
        function ($stateProvider, $urlRouterProvider,$compileProvider) {

        $compileProvider.debugInfoEnabled(false);
        $urlRouterProvider.otherwise('/hotels');

        $stateProvider
            .state('hotels', {
                abstract: true,
                url: '/hotels',
                template: '<ui-view/>'
            })
            .state('hotels.list', {
                url: '',
                templateUrl: './app/modules/hotels/hotels.html',
                controller: 'hotelsController'
            })
            .state('hotels.edit', {
                url: '/hotel-edit/:id',
                templateUrl: './app/modules/hotels/hotel-edit.html',
                controller: 'hotelsController'
            })
            .state('hotels.rooms', {
                url: '/hotel-rooms/:id',
                templateUrl: './app/modules/hotels/hotel-rooms.html',
                controller: 'hotelsController'
            })
            .state('hotels.create', {
                url: '/add-hotel',
                templateUrl: './app/modules/hotels/add-hotel.html',
                controller: 'hotelsController'
            })
            .state('hotel-preview', {
                url: '/hotel-preview/:id',
                templateUrl: './app/modules/hotels/hotel-preview.html',
                controller: 'hotelsController'
            })
    }]);
})();