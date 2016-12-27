'use strict';

angular
    .module('app')
    .controller('hotelsController',['$scope', '$http', '$location', 'managerService', '$stateParams', '$state', '$uibModal','$rootScope',
        function ($scope, $http, $location, managerService, $stateParams, $state, $uibModal,$rootScope) {
        $scope.filterName = '';
        $scope.hotelsJSON = [];
        $scope.brandsJSON = [];
        $scope.pageSize = 5;
        $scope.currentPage = 1;
        $rootScope.brandF;

        $scope.init = function () {
            managerService.getHotels().then(function (res) {
                $scope.hotels = res;
            });
        };

        $http.get('./json/brands.json').then(function (res) {
            $scope.brandsJSON = res.data;
        });

        $scope.filterBrands = function (brand) {
            $scope.currentPage = 1;
            $rootScope.brandF = brand;
        };

        $scope.Add = function (newHotel) {
            $http.post('http://localhost:4730/addhotel', {newHotel: newHotel}).then(function (res) {
                managerService.reload().then(function (res) {
                    $scope.hotels = res.data;
                })
            }, function (res) {
                console.log(res.data);
            });
        };

        $scope.getRooms = function () {
            $scope.hotelToShow = managerService.getHotel();
        };

        $scope.getHotel = function () {
            var hotelId = $stateParams.id;
            managerService.getHotels().then(function (res) {
                $scope.hotels = res;
                $scope.hotels.forEach(function (h) {
                    if (h._id == hotelId) {
                        $scope.hotel = h;
                    }
                });
            });
        };

        $scope.edit = function () {
            managerService.update($scope.hotel).then(function (res) {
                $scope.hotels = res;
                $state.go('hotels.list');
            });
        };

        $scope.removeHotel = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/modules/hotels/modal/confirm.html',
                controller: 'confirmCtrl',
                size: 'md'
            });

            modalInstance.result.then(function (modRes) {
                if (modRes) {
                    managerService.delete($scope.hotel).then(function (res) {
                        $scope.hotels = res;
                        $state.go('hotels.list')
                    });
                }
            });
        };

        $scope.delete = function (hotel) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/modules/hotels/modal/confirm.html',
                controller: 'confirmCtrl',
                size: 'md'
            });

            modalInstance.result.then(function (modRes) {
                if (modRes) {
                    managerService.delete(hotel).then(function (res) {
                        $scope.hotels = res;
                        $state.go('hotels.list')
                    });
                }
            });
        };
    }]);

angular
    .module('app').controller('confirmCtrl',['$scope','$modalInstance', function ($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close(true);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);