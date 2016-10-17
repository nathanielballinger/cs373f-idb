'use strict';   // See note about 'use strict'; below

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider',
     function($routeProvider) {
         $routeProvider.
             when('/', {
                 templateUrl: '/static/partials/index.html',
             }).
             when('/about', {
                 templateUrl: '../static/partials/about.html',
             }).
             when('/games', {
                 templateUrl: '../static/partials/list.html',
             }).
             when('/platforms', {
                 templateUrl: '../static/partials/list.html',
             }).
             when('/characters', {
                 templateUrl: '../static/partials/list.html',
             }).
             otherwise({
                 redirectTo: '/'
             });
    }]);