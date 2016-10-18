'use strict';   // See note about 'use strict'; below

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider',
     function($routeProvider) {
         $routeProvider.
             when('/', {
                 templateUrl: '../static/partials/splash.html',
             }).
             when('/about', {
                 templateUrl: '../static/partials/about.html',
             }).
             when('/games', {
                 templateUrl: '../static/partials/games.html',
                 controller: 'gamesCtrl'
             }).
             when('/platforms', {
                 templateUrl: '../static/partials/platforms.html',
                 controller: 'platformsCtrl',
             }).
             when('/characters', {
                 templateUrl: '../static/partials/characters.html',
                 controller: 'charactersCtrl',
             }).
             when('/game/:id', {
                 templateUrl: '../static/partials/game.html',
                 controller: 'gameCtrl',
             }).
             when('/character/:id', {
                 templateUrl: '../static/partials/character.html',
                 controller: 'characterCtrl',
             }).
             when('/platform/:id', {
                 templateUrl: '../static/partials/platform.html',
                 controller: 'platformtrl',
             }).
             otherwise({
                 redirectTo: '/'
             });
    }]);


//Controller for all games
myApp.controller('gamesCtrl', function($scope, $http){
    $http.get("/getGameTable")
    .then(function (response) {
        $scope.games = response.data;
        console.log($scope.games)
    })

    $scope.info = {};


    $scope.init = function() {
        console.log("Hello World from games");
    }
})

//Controller for all Platforms
myApp.controller('platformsCtrl', function($scope, $http){

    $http.get("/getPlatformTable")
    .then(function (response) {
        $scope.games = response.data;
        console.log($scope.games)
    })

    $scope.info = {};


    $scope.init = function() {
        console.log("Hello World from platforms");
    }
})

//Controller for all characters
myApp.controller('charactersCtrl', function($scope, $http){

    $http.get("/getCharacterTable")
    .then(function (response) {
        $scope.games = response.data;
        console.log($scope.games)
    })

    $scope.info = {};


    $scope.init = function() {
        console.log("Hello World from characters");
    }
})

//Controller for one Game
myApp.controller('gameCtrl', ['$scope','$routeParams', '$http', function($scope, $routeParams, $http) {

    var gameId = $routeParams.id

    $http.get("/getGame/?id="+gameId)
    .then(function (response) {
        $scope.game = response.data;
        console.log($scope.game)
    })

    $scope.info = {};


    $scope.init = function() {
        console.log("Hello World from game");
    }

}]);

//Controller for one Character
myApp.controller('characterCtrl', ['$scope','$routeParams', '$http', function($scope, $routeParams, $http) {
    var characterId = $routeParams.id;

    $http.get("/getCharacter/?id="+characterId)
    .then(function (response) {
        $scope.character = response.data;
        console.log($scope.character)
    })

    $scope.info = {};


    $scope.init = function() {
        console.log("Hello World from character");
    }

}]);

//Controller for one Platform
myApp.controller('platformCtrl', ['$scope','$routeParams', '$http', function($scope, $routeParams, $http) {
    var platformId = $routeParams.id;

    $http.get("/getPlatform/?id="+platformId)
    .then(function (response) {
        $scope.games = response.data;
        console.log($scope.games)
    })

    $scope.info = {};


    $scope.init = function() {
        console.log("Hello World from platform");
    }

}]);


// //Controller for one Game
// myApp.controller('gameCtrl', function($scope, $http){

//     $http.get("/getGame")
//     .then(function (response) {
//         $scope.game = response.data;
//         console.log($scope.game)
//     })

//     $scope.info = {};


//     $scope.init = function() {
//         console.log("Hello World from game");
//     }
// })

// //Controller for one Character
// myApp.controller('characterCtrl', function($scope, $http){

//     $http.get("/getCharacter")
//     .then(function (response) {
//         $scope.character = response.data;
//         console.log($scope.character)
//     })

//     $scope.info = {};


//     $scope.init = function() {
//         console.log("Hello World from character");
//     }
// })

// //Controller for one Platform
// myApp.controller('platformCtrl', function($scope, $http){

//     $http.get("/getPlatform")
//     .then(function (response) {
//         $scope.games = response.data;
//         console.log($scope.games)
//     })

//     $scope.info = {};


//     $scope.init = function() {
//         console.log("Hello World from platform");
//     }
// })

