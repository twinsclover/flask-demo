var initModule = angular.module('initModule', ['dataModule']);

initModule.factory('initService', initService);

initService.$inject = ['$q', '$rootScope', '$browser'];

function initService($q, $rootScope, $browser) {

  var sv = {};
  sv.init = init;
  sv.watchAfterInit = watchAfterInit;
  sv.onAfterInit = onAfterInit;

  var initFunctions = [
    'noteController',
    'naviController',
  ];
  var registeredInitFunctions = {};
  var initialized = false;
 
  var initApplication = function () {
    var noteController = registeredInitFunctions['noteController'];
    var naviController = registeredInitFunctions['naviController'];
 
    var broadcastAppInitialized = function () {
      $browser.defer(function () {
        initialized = true;
        $rootScope.$apply(function () {
          $rootScope.$broadcast('appInitialized');
        });
      });
    };

    naviController.init().
      then(noteController.init);
  };
 
  $rootScope.$on('$routeChangeStart', function () {
    registeredInitFunctions = {};
    initialized = false;
  });
 
  var initAppWhenReady = function () {
    var registeredInitFunctionNames = _.keys(registeredInitFunctions);
    var isRegistered = _.partial(_.contains, registeredInitFunctionNames);
    if (_.every(initFunctions, isRegistered)) {
      initApplication();
      registeredInitFunctions = null;
    }
  };
 
  function init(name, dependencies, initCallback) {
    registeredInitFunctions[name] = {
      init: function () {
        var internalDependencies = $q.all(dependencies);
        return internalDependencies.then(initCallback);
      }};
    initAppWhenReady();
  };
 
  function watchAfterInit(scope, expression, listener, deepEqual) {
    scope.$watch(expression, function (newValue, oldValue, listenerScope) {
      if (initialized) {
        listener(newValue, oldValue, listenerScope);
      }
    }, deepEqual);
  };

  function onAfterInit(scope, event, listener) {
    scope.$on(event, function (event) {
      if (initialized) {
        listener(event);
      }
    });
  };

  return  sv;
};

