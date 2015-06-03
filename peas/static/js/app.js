var peasModule = angular.module('peas', ['ngRoute', 'note']);

peasModule.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/test', {
        templateUrl: 'static/js/note.ng',
        controller: 'noteCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
