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