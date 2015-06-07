var noteModule = angular.module('noteModule', []);

noteModule.controller('noteController', noteController);

noteController.$inject = ['$scope', 'noteService', 'initService'];

/**
 * The controller for note related stuff.
 */
function noteController($scope, noteService, initService) {
  var vm = this;

  vm.title = '';
  vm.content = '';
  vm.notes = [];
  vm.response = '';
  vm.book = null;

  vm.addNote = addNote;
  vm.deleteNote = deleteNote;
  vm.listNotes = listNotes;
  vm.handleError = handleError;

  // Init.
  (function() {
    $scope.$on(naviModule.EventType.SELECTED, handleSelectEvent);
    initService.init('noteController', [], function() {
    });
  })();
  
  // Definitions

  function addNote() {
    var bookId = vm.book['id'];
    noteService.add(bookId, vm.title, vm.content).
      success(vm.listNotes).
      error(vm.handleError);
  };

  function deleteNote(id) {
    noteService.delete(id).
      success(vm.listNotes).
      error(vm.handleError);
  };

  function listNotes() {
    var bookId = vm.book['id'];
    noteService.list(bookId).
      success(function(json) {
        vm.notes = json.notes;
      }).
      error(vm.handleError);
  };

  // TODO(liutong): Check whether we need to use angular.bind or not.
  function handleError(data) {
    vm.response = data;
  };

  function handleSelectEvent(e, book) {
    vm.book = book;
    vm.listNotes();
  };
};
