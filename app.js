var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, $q, $timeout) {
  
  $scope.longTaskFinishedFlag = false;
  $scope.isResolved = false;
  $scope.msg = "";
  var currentMsg = "";
  var breaker = 0;
  console.clear();
  
  function _ordinary_long_computing_task(isResolved) {
    var deferred = $q.defer();
    $scope.isResolved = $scope.isResolved || isResolved;
    
    currentMsg = "Start long computing task. Mark: " + (performance.now() - sTime).toFixed(4).toString() + "\n";
    $scope.msg = currentMsg;
    deferred.notify(currentMsg);
    
    // do stuff (Action that needs time to complete)
    longTaskTimeout = $timeout(function() {
      currentMsg = 'Finishing long computing task.' + "\n";
      deferred.notify(currentMsg);
      
      if($scope.isResolved == 1) {
        currentMsg = "\n" + "SUCCESS _ordinary_long_computing_task is RESOLVED :)" + "\n";
        $scope.msg += currentMsg;
        deferred.resolve(currentMsg);
      } else {
        currentMsg = "\n" + "FAILURE _ordinary_long_computing_task is REJECTED :(" + "\n";
        $scope.msg += currentMsg;
        deferred.reject(currentMsg);
      }
      
      // Confirm computation has finished > set flag to true
      $scope.longTaskFinishedFlag = true;
    }, 3000);
    return deferred.promise;
  }
  
  // Queue that recursively checkes for task completion
  function _recursive_queue() {
    currentMsg = "Recursive queue check for task completion. Mark: " + (performance.now() - sTime).toFixed(4).toString() + "\n";
    $scope.msg += currentMsg;
    console.log(currentMsg);
    if ( breaker < 30) {
      recursiveTimer = $timeout(function() {
        breaker++;
        if (!$scope.longTaskFinishedFlag)
          _recursive_queue();
      }, 500);
    } else {
      $timeout.cancel(recursiveTimer);
      currentMsg = "Recursive queue has reached MAX iterations. Exiting! Mark: " + (performance.now() - sTime).toFixed(4).toString() + "\n";
      $scope.msg += currentMsg;
      console.log(currentMsg);
    }
  }
  
  $scope.init = function() {
    $scope.longTaskFinishedFlag = false;
    $scope.isResolved = false;
    $scope.msg = "";
    currentMsg = "";
    breaker = 0;
    console.clear();
    sTime = performance.now();
    
    _ordinary_long_computing_task(true).then(function(result){
      currentMsg = result, (performance.now() - sTime).toFixed(4).toString() + "\n";
      $scope.msg += currentMsg;
      console.log(currentMsg);
    }, function(error) {
      currentMsg = error + (performance.now() - sTime).toFixed(4).toString() + "\n";
      $scope.msg += currentMsg;
      console.log(currentMsg);
    }, function(update) {
      currentMsg = update + (performance.now() - sTime).toFixed(4).toString() + "\n";
      $scope.msg += currentMsg;
      console.log(currentMsg);
    });
    _recursive_queue();
  };
  
  $scope.setFailedTask = function() {
    $scope.isResolved = false;
  }
  
  $scope.generateInterrupt = function() {
    $scope.longTaskFinishedFlag = true;
    if (longTaskTimeout) {
      $timeout.cancel(longTaskTimeout);
      currentMsg = "\n" + "ERROR! Manual interrupt! Exiting..." + "\n";
      $scope.msg += currentMsg;
      deferred.reject(currentMsg);
    }
  }
  
  // $scope.init();
});
