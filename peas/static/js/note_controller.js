var noteModule = angular.module('noteModule', ['dataModule']);

noteModule.controller('noteController', noteController);

noteController.$inject = ['$scope', 'noteService'];

/**
 * The controller for note related stuff.
 */
function noteController($scope, noteService) {
  var vm = this;

  vm.title = '';
  vm.content = '';
  vm.notes = [];
  vm.response = '';
  vm.book = {};

  vm.addNote = addNote;
  vm.deleteNote = deleteNote;
  vm.listNotes = listNotes;
  vm.handleError = handleError;

  $scope.$on(naviModule.EventType.SELECTED, handleSelectEvent);

  vm.listNotes();
  
  // Definitions

  function addNote() {
    noteService.add(vm.book['id'] || 0, vm.title, vm.content,
      vm.listNotes, vm.handleError);
  };

  function deleteNote(id) {
    noteService.delete(id, vm.listNotes, vm.handleError);
  };

  function listNotes() {
    noteService.list(
      vm.book['id'] || 0,
      function(json) {
        vm.notes = json.notes;
      },
      vm.handleError);
  };

  // TODO(liutong): Check whether we need to use angular.bind or not.
  function handleError(data) {
    vm.response = data;
  };

  function handleSelectEvent(e, selectedBook) {
    vm.book = selectedBook;
    vm.listNotes();
  };

};
