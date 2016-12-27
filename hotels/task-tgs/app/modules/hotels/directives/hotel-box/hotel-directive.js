(function () {
    'use strict';

    angular.module('app').directive('hotelBox',['$uibModal', '$http', '$log','$location','$state'
        , function ($uibModal, $http, $log,$location,$state) {
        return {
            restrict: 'EA',
            //controller:'hotelsController',
            templateUrl: './app/modules/hotels/directives/hotel-box/hotel-directive.html',
            scope: {
                hotelOwn: '=',
                moveToPageDetails: '&',
                delete: '&'
            },
            link: function (scope, el, attrs) {
                scope.animationsEnabled = true; // for modal
                $http.get('./json/hotels.json').then(function (res) {
                    scope.hotelsJSON = res.data;
                });


                scope.moveToPageDetails = function () { // move to page after choosen who to edit

                    $state.go('hotel-preview',{id:scope.hotelOwn._id});
                  //  $location.path('/hotel-details/'+scope.hotelOwn._id);
                };

            }
        }
    }])
})();