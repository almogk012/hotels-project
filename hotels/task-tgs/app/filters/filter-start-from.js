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