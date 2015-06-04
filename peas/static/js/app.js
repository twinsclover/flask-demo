var app = angular.module('peas', ['ngRoute', 'noteModule', 'naviModule']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'static/js/note.ng',
      controller: 'noteController',
      controllerAs: 'noteCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);
