var naviModule = angular.module('naviModule', ['dataModule']);

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

naviController.$inject = ['$scope', 'bookService'];

function naviController($scope, bookService) {
  var vm = this;

  vm.name = ''
  vm.defaultBook = {id: 0, name: 'All'};
  vm.books = [vm.defaultBook];
  vm.response = '';
  vm.selectedBook = vm.defaultBook;

  vm.addBook = addBook;
  vm.deleteBook = deleteBook;
  vm.listBooks = listBooks;
  vm.selectBook = selectBook;
  vm.handleError = handleError;

  vm.listBooks();

  function addBook() {
    if (!vm.name) {
      alert('empty name');
      return;
    }
    bookService.add(vm.name, vm.listBooks, vm.handleError);
  };

  function deleteBook(id) {
    bookService.delete(id, vm.listBooks, vm.handleError);
  };

  function listBooks() {
    bookService.list(
      function(json) {
        vm.books = [vm.defaultBook].concat(json.books);
      },
      vm.handleError);
  };

  function selectBook(book) {
    vm.selectedBook = book;
    $scope.$broadcast(naviModule.EventType.SELECTED, vm.selectedBook);
  };

  // TODO(liutong): Check whether we need to use angular.bind or not.
  function handleError(data) {
    vm.response = data;
  };
};
