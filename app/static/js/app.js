'use strict';   // See note about 'use strict'; below

var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize']);

myApp.constant('_',
    window._
);

myApp.config(['$routeProvider',
     function($routeProvider) {
         $routeProvider.
             when('/', {
                 templateUrl: '../static/partials/splash.html',
             }).
             when('/about', {
                 templateUrl: '../static/partials/about.html',
                 controller: 'aboutCtrl'
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
                 controller: 'platformCtrl',
             }).
             otherwise({
                 redirectTo: '/'
             });
    }]);

//var scope;
myApp.controller('headerCtrl', function($scope, $http, $location) {
    $scope.navCollapsed = true;
    $scope.refs = [];
    var pageNames = ["Games", "Platforms", "Characters", "About"];
    var pageRefs = ["/#/games", "/#/platforms", "/#/characters", "/#/about"];
    var temp = $scope.refs; 
    for (var i = 0; i < pageNames.length; i++) {   
        temp.push({"name":pageNames[i], "href":pageRefs[i]});
    }

    $scope.isActive = function(viewLocation) {
        return viewLocation == $location.path();
    };

    //debug; remove after
    //scope = $scope;
})

//Controller for all games
myApp.controller('gamesCtrl', function($scope, $http){
    
    $scope.order = true;
    $scope.sortVar = "Name"
    $http.get("/api/games/offset/1")
    .then(function (response) {
        $scope.games = response.data;
        console.log($scope.games)
    })

    $scope.info = {};

    $scope.swapOrder = function() {
        $scope.order = !$scope.order;
        $scope.games.reverse();
    }


    $scope.init = function() {
        console.log("Hello World from games");
    }

    $scope.sortBy = function(sorter) {
        $scope.sortVar = sorter;
        $scope.games = _.sortBy($scope.games, function(game){
            switch(sorter){
                case "Name":
                    return game.name
                case "Release Date":
                    return game.original_release_date
                case "Genre":
                    return game.genres[0].name
                case "Developer/Publisher":
                    return game.developers[0].name
                case "Platform":
                    return game.platforms[0].name
            }
        });
    }
})

//Controller for all Platforms
myApp.controller('platformsCtrl', function($scope, $http, _){

    $scope.order = true;
    $scope.sortVar = "Name"
    $http.get("/api/platforms/offset/1")
    .then(function (response) {
        $scope.platforms = response.data;
        $scope.sortBy($scope.sortVar);
        console.log($scope.platforms)
    })

    $scope.info = {};

    $scope.swapOrder = function() {
        $scope.order = !$scope.order;
        $scope.platforms.reverse();
    }


    $scope.init = function() {
        console.log("Hello World from platforms");
    }

    $scope.sortBy = function(sorter) {
        $scope.sortVar = sorter;
        $scope.platforms = _.sortBy($scope.platforms, function(platform){
            switch(sorter){
                case "Name":
                    return platform.name
                case "Release Date":
                    return platform.release_date
                case "Company":
                    return platform.company.name
                case "Starting Price":
                    return parseInt(platform.original_price)
            }
        });
    }
})

//Controller for all characters
myApp.controller('charactersCtrl', function($scope, $http){
    $scope.order = true;
    $scope.sortVar = "Name";
    $http.get("api/characters/offset/1")
    .then(function (response) {
        $scope.characters = response.data;
        console.log($scope.characters)
    })

    $scope.info = {};


    $scope.swapOrder = function() {
        $scope.order = !$scope.order;
        $scope.characters.reverse();
    }

    $scope.init = function() {
        console.log("Hello World from characters");
    }

    $scope.sortBy = function(sorter) {
        $scope.sortVar = sorter;
        $scope.characters = _.sortBy($scope.characters, function(platform){
            switch(sorter){
                case "Name":
                    return platform.name
                case "First Game":
                    return platform.release_date
                case "Birthday":
                    return platform.first_appeared_in_game.name
                case "Gender":
                    return platform.gender
            }
        });
    }
})


var listVals = ["friends", "enemies", "platforms", "genres", "developers", "characters"];

function fixNullEmpty(obj) {
    var defaultVal;
    // Fix all the null and empty string values 
    for (var key in obj) {
        if(obj.hasOwnProperty(key)) {
            if (listVals.indexOf(key) > -1) 
                defaultVal = [];
            else
                defaultVal = "Unknown";

            var val = obj[key];
            if(val == null)
                obj[key] = defaultVal;  
            if((typeof val === 'string' || val instanceof String) && val.length ==0)
                obj[key] = defaultVal;
        }
    }

    // In case there is no image
    if (obj.image == null || obj.image.super_url == null) 
        obj.image ={"super_url" : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"};
    return obj;
}

//Controller for one Game
myApp.controller('gameCtrl', ['$scope','$routeParams', '$http', function($scope, $routeParams, $http) {

    var gameId = $routeParams.id

    $http.get("/api/games/"+gameId)
    .then(function (response) {
        var data = response.data;
        $scope.game = fixNullEmpty(data);
        console.log($scope.game)
    })

    $scope.info = {};


    $scope.init = function() {
        console.log("Hello World from game");
    }

}]);

//Controller for one Character
myApp.controller('characterCtrl', ['$scope','$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {
    var characterId = $routeParams.id;

    $http.get("/api/characters/"+characterId)
    .then(function (response) {
        var data = response.data;
        $scope.character = fixNullEmpty(data);
        console.log($scope.character);
    })

    $scope.init = function() {
        console.log("Hello World from character");
    }

}]);

//Controller for one Platform
myApp.controller('platformCtrl', ['$scope','$routeParams', '$http', function($scope, $routeParams, $http) {
    var platformId = $routeParams.id;

    $http.get("/api/platforms/"+platformId)
    .then(function (response) {
        var data = response.data;
        $scope.platform = fixNullEmpty(data);
        console.log($scope.platform)
    })

    $scope.info = {};


    $scope.init = function() {
        console.log("Hello World from platform");
    }

}]);

//Controller for about page
var scope;
myApp.controller('aboutCtrl', ['$scope','$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.testOutput = "";

    var usernameToName = {
        "Eitan-Yarmush" : "eitan",
        "Kwong98" : "keith",
        "ctc837" : "chris",
        "abhirathod95" : "abhi",
        "nathanielballinger" : "nathan",
        "total" : "total"
    }

    for (var key in usernameToName) {
        $scope[usernameToName[key]] = {"contributions" : 0, "issues" : 0};
    }
    $http.get("https://api.github.com/repos/nathanielballinger/cs373-idb/contributors")
    .then(function (response) {
        var data = response.data;
        for(var i = 0; i < data.length; i++) {
            var username = data[i].login;
            console.log(username);
            if(username == "EItanya")
                $scope.eitan.contributions += data[i].contributions;
            else 
                $scope[usernameToName[username]].contributions = data[i].contributions;

            $scope.total.contributions += data[i].contributions;
        }
    })

    $http.get("https://api.github.com/repos/nathanielballinger/cs373-idb/issues?per_page=100&state=all")
    .then(function (response) {
        var data = response.data;
        for(var i = 0; i < data.length; i++) {
            var username = data[i].user.login;
            if(username == "EItanya")
                $scope.eitan.issues += 1;
            else
                $scope[usernameToName[username]].issues += 1;
            $scope.total.issues += 1;
        }
    })

    $scope.runTests = function () {
        $http.get("/api/runtests")
        .then(function (response) {
            $scope.testOutput = response.data;
        })
    }

    $scope.info = {};


    $scope.init = function() {
        console.log("Hello World from platform");
    }
    scope = $scope;
}]);


