var naviModule = angular.module('naviModule', []);

naviModule.directive('navi', naviDirective);
naviModule.controller('naviController', naviController);

/**
 * The event type.
 */
naviModule.EventType = {
  SELECTED: 'book selected'
};

function naviDirective() {
  return {
    replace: true,
    templateUrl: 'static/js/navi.ng',
    controller: 'naviController',
    controllerAs: 'naviCtrl'
  };
};

naviController.$inject = ['$scope', '$rootScope', '$q', 'bookService',
  'initService'];

function naviController($scope, $rootScope, $q, bookService, initService) {
  var vm = this;

  vm.name = ''
  vm.defaultBook = {'id': 0, 'name': 'All'};
  vm.books = [vm.defaultBook];
  vm.response = '';

  vm.addBook = addBook;
  vm.deleteBook = deleteBook;
  vm.listBooks = listBooks;
  vm.selectedBook = vm.defaultBook;
  vm.selectBook = selectBook;
  vm.handleError = handleError;

  // Init.
  (function() {
    initService.init('naviController', [vm.listBooks()], function() {
      // TODO(liutong): Save previous selection in backend and retrieve here.
      vm.selectBook(vm.defaultBook);
    });
  })();
  
  function addBook() {
    if (!vm.name) {
      alert('empty name');
      return;
    }
    bookService.add(vm.name).
      success(vm.listBooks).
      error(vm.handleError);
  };

  function deleteBook(id) {
    bookService.delete(id).
      success(vm.listBooks).
      error(vm.handleError);
  };

  function listBooks() {
    return bookService.list().
      success(function(json) {
        vm.books = [vm.defaultBook].concat(json.books);
      }).
      error(vm.handleError);
  };

  function selectBook(book) {
    vm.selectedBook = book;
    $rootScope.$broadcast(naviModule.EventType.SELECTED, book);
  };

  // TODO(liutong): Check whether we need to use angular.bind or not.
  function handleError(data) {
    vm.response = data;
  };
};
