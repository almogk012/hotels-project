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