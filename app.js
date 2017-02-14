var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, $q, $timeout) {
  
  $scope.longTaskFinishedFlag = false;
  $scope.isResolved = false;
  $scope.msg = "";
  var currentMsg = "";
  var checkCounter = 0;
  console.clear();
  
  function _ordinary_long_computing_task(isResolved) {
    var deferred = $q.defer();
    $scope.isResolved = $scope.isResolved || isResolved;
    
    currentMsg = "Start long computing task. Mark: " + (performance.now() - sTime).toFixed(4).toString() + "\n";
    $scope.msg = currentMsg;
    deferred.notify(currentMsg);
    
    // TODO: do stuff (Action that needs time to complete)
	// start of Long Running Task
	// Replace this $timeout with your ACTUAL long running task
	// Implement promise's resolve, reject and notify
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
	// end of Long Running Task
	
    return deferred.promise;
  }
  
  // Queue that recursively checkes for task completion
  // When longTaskFinishedFlag is set, it will end execution or 
  // finish by itself in a predifined time (30*500 = 15 sec)
  function _recursive_queue() {
    currentMsg = "Recursive queue check for task completion. Mark: " + (performance.now() - sTime).toFixed(4).toString() + "\n";
    $scope.msg += currentMsg;
    console.log(currentMsg);
    if ( checkCounter < 30) {
      recursiveTimer = $timeout(function() {
        checkCounter++;
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
  
  // start long running task and reinitialize variables;
  $scope.init = function() {
    $scope.longTaskFinishedFlag = false;
    $scope.isResolved = false;
    $scope.msg = "";
    currentMsg = "";
    checkCounter = 0;
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
  
  // mark Long running task as failed.
  // In this way we manually simulate an error in the execution.
  $scope.setFailedTask = function() {
    $scope.isResolved = false;
  }
  
  // General interrupt method that breaks and clears timers.
  $scope.generateInterrupt = function() {
    $scope.longTaskFinishedFlag = true;
	$timeout.cancel(longTaskTimeout);
	currentMsg = "\n" + "ERROR! Manual interrupt! Exiting..." + "\n";
	$scope.msg += currentMsg;
	deferred.reject(currentMsg);
  }
  
  // $scope.init();
});
