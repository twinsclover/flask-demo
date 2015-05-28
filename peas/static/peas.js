var peasModule = angular.module('peas', []);

peasModule.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

peasModule.controller('peasCtrl',
    ['$scope', '$http', 'noteService', function($scope, $http, noteService) {
  $scope.title = '';
  $scope.content = '';
  $scope.notes = [];
  $scope.response = '';
  $scope.addNote = function() {
    noteService.add($scope.title, $scope.content, $scope.getNotes,
      $scope.handleError);
  };

  $scope.deleteNote = function(id) {
    noteService.delete(id, $scope.getNotes, $scope.handleError);
  };

  $scope.getNotes = function() {
    noteService.list(
      function(json) {
        $scope.notes = json.notes;
      },
      $scope.handleError);
  };

  // TODO(liutong): Check whether we need to use angular.bind or not.
  $scope.handleError = function(data) {
    $scope.response = data;
  };

  $scope.getNotes();
}]);

peasModule.factory('noteService', ['$http', function($http) {
  /**
   * Sends a request to add one note.
   * @param {string} title The title of note.
   * @param {string} content The content of note.
   * @param {function} succCallback Invoked when request is succeeded.
   * @param {function} errorCallback Invoked when request is failed.
   */
  this.add = function(title, content, succCallback, errorCallback) {
    var resp = $http.post('/add',
      { title: title, content: content }); 
    resp.success(succCallback);
    resp.error(errorCallback);
  };

  /**
   * Sends a request to delete one note by id.
   * @param {string} id The id of note to deleted.
   * @param {function} succCallback Invoked when request is succeeded.
   * @param {function} errorCallback Invoked when request is failed.
   */
  this.delete = function(id, succCallback, errorCallback) {
    var resp = $http.post('/delete', { id: id });
    resp.success(succCallback);
    resp.error(errorCallback);
  };

  /**
   * Sends a request to list all the notes.
   * @param {function} succCallback Invoked when request is succeeded.
   * @param {function} errorCallback Invoked when request is failed.
   */
  this.list = function(succCallback, errorCallback) {
    var resp = $http.get('/get');
    resp.success(succCallback);
    resp.error(errorCallback);
  };

  return this;
}]);
