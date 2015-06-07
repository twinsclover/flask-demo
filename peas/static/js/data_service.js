var dataModule = angular.module('dataModule', []);
    
dataModule.factory('noteService', noteService);
dataModule.factory('bookService', bookService);



/**
 * This service is used to send notes related requests to backend.
 */
noteService.$inject = ['$http'];

function noteService($http) {
  var sv = {};

  sv.add = addNote;
  sv.delete = deleteNote;
  sv.list = listNotes;

  /**
   * Sends a request to add one note.
   * @param {number} bookId The id of book.
   * @param {string} title The title of note.
   * @param {string} content The content of note.
   */
  function addNote(bookId, title, content) {
    return $http.post('/note/add',
        { book_id: bookId, title: title, content: content }); 
  };

  /**
   * Sends a request to delete one note by id.
   * @param {string} id The id of note to deleted.
   */
  function deleteNote(id) {
    return $http.post('/note/delete', { id: id });
  };

  /**
   * Sends a request to list all the notes.
   * @param {function} bookId The book to search notes.
   */
  function listNotes(bookId) {
    return $http.post('/note/list', { book_id: bookId });
  };

  return sv;
};


/**
 * This service is used to send books related requests to backend.
 */
bookService.$inject = ['$http', '$rootScope'];

function bookService($http, $rootScope) {
  var sv = {};

  // Methods.
  sv.add = addBook;
  sv.delete = deleteBook;
  sv.list = listBooks;

  /**
   * Sends a request to add one book.
   * @param {string} name The name of book.
   */
  function addBook(name) {
    return $http.post('/book/add', { name: name }); 
  };

  /**
   * Sends a request to delete one book by id.
   * @param {string} id The id of book to deleted.
   */
  function deleteBook(id) {
    return $http.post('/book/delete', { id: id });
  };

  /**
   * Sends a request to list all the books.
   */
  function listBooks() {
    return resp = $http.get('/book/list');
  };

  return sv;
};
