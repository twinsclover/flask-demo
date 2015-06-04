var dataModule = angular.module('dataModule', []);
    
/**
 * This service is used to send notes related requests to backend.
 */
dataModule.factory('noteService', ['$http', function($http) {
  /**
   * Sends a request to add one note.
   * @param {number} bookId The id of book.
   * @param {string} title The title of note.
   * @param {string} content The content of note.
   * @param {function} succCallback Invoked when request is succeeded.
   * @param {function} errorCallback Invoked when request is failed.
   */
  this.add = function(bookId, title, content, succCallback, errorCallback) {
    var resp = $http.post('/note/add',
      { book_id: bookId, title: title, content: content }); 
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
    var resp = $http.post('/note/delete', { id: id });
    resp.success(succCallback);
    resp.error(errorCallback);
  };

  /**
   * Sends a request to list all the notes.
   * @param {function} bookId The book to search notes.
   * @param {function} succCallback Invoked when request is succeeded.
   * @param {function} errorCallback Invoked when request is failed.
   */
  this.list = function(bookId, succCallback, errorCallback) {
    var resp = $http.post('/note/list', { book_id: bookId });
    resp.success(succCallback);
    resp.error(errorCallback);
  };

  return this;
}]);


/**
 * This service is used to send books related requests to backend.
 */
dataModule.factory('bookService', ['$http', function($http) {
  /**
   * Sends a request to add one book.
   * @param {string} name The name of book.
   * @param {function} succCallback Invoked when request is succeeded.
   * @param {function} errorCallback Invoked when request is failed.
   */
  this.add = function(name, succCallback, errorCallback) {
    var resp = $http.post('/book/add',
      { name: name }); 
    resp.success(succCallback);
    resp.error(errorCallback);
  };

  /**
   * Sends a request to delete one book by id.
   * @param {string} id The id of book to deleted.
   * @param {function} succCallback Invoked when request is succeeded.
   * @param {function} errorCallback Invoked when request is failed.
   */
  this.delete = function(id, succCallback, errorCallback) {
    var resp = $http.post('/book/delete', { id: id });
    resp.success(succCallback);
    resp.error(errorCallback);
  };

  /**
   * Sends a request to list all the books.
   * @param {function} succCallback Invoked when request is succeeded.
   * @param {function} errorCallback Invoked when request is failed.
   */
  this.list = function(succCallback, errorCallback) {
    var resp = $http.get('/book/list');
    resp.success(succCallback);
    resp.error(errorCallback);
  };

  return this;
}]);
