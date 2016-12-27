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