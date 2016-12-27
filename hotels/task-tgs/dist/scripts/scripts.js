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
'use strict';

angular.module('app').filter('brandFilter', function () {
    return function (hotels, brand) {
        var arr = [];
        if (typeof brand === "undefined" && hotels != 'undefined') {
            return hotels
        }
        if (hotels && brand) {
            if (brand == 'All') {
                return hotels;
            }

            hotels.filter(function (hotel) {
                if (hotel.details.brand.txt === brand) {
                    arr.push(hotel)
                }
            });
            return arr;
        }
    }
});
(function () {
    'use strict';

    angular.module('app').filter('startFrom', function () {
        return function (input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
        }
    });
})();
'user strict';

angular.module('app').factory('managerService',['$http','$q', function ($http, $q) {
    //var hotel = [];
    var newhotel = {};
    var hotelToRemove = {};

    var service = {};

    this.service = {};
    service.getHotels = function () {
        if (service.hotels) {
            var deferred = $q.defer();
            deferred.resolve(service.hotels);
            return deferred.promise;
        } else {
            return $http.get('./json/hotels.json').then(function (res) {
                service.hotels = res.data;
                return service.hotels;
            });
        }
    };

    service.update = function (hotel) {
        service.hotels.forEach(function (h) {
            if (h._id == hotel._id) {
                h = hotel;
            }
        });

        var deferred = $q.defer();
        deferred.resolve(service.hotels);
        return deferred.promise;

    };
    service.delete = function (hotel) {
        var index = service.hotels.indexOf(hotel);
        service.hotels.splice(index, 1);


        var deferred = $q.defer();
        deferred.resolve(service.hotels);
        return deferred.promise;

    };

    service.reload=function(){
        return $http.get('./json/hotels.json').then(function (res) {
            service.hotels = res.data;
            return service.hotels;
        });
    };

    return service;
}]);
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
////(function () {
////
////})();
//'use strict';
//
//angular
//    .module('app')
//    .controller('confirmCtrl', function ($scope, $modalInstance, items,$rootScope) {
//
//        $scope.ok = function () {
//            $modalInstance.close(true);
//        };
//
//        $scope.cancel = function () {
//            $modalInstance.dismiss('cancel');
//        };
//    });
(function () {
    'use strict';

    angular.module('app').directive('brandBox',function () {
        return{
            restrict:'EA',
            templateUrl:'./app/modules/hotels/directives/brands/brands-directive.html',
            scope:{
                brandItem:'=',
                filterBrands:'&'
            }
        }
    })
})();
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