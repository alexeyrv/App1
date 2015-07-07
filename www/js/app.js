// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myapp = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {



    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }


  });
})

myapp.controller( 'sctrl', ['$scope', '$interval', 
	function($scope, $interval) {
	
		$scope.nSpeed = 150; // должно быть 1000 милисекунд
		
		$scope.nStage = 1;
		$scope.aStagesize = [ 1, 2, 4, 2 ];
		$scope.aStageName = [ 'Вдох', 'Пауза А', 'Выдох', 'Пауза Б' ];
		$scope.nBase = 1;
/*		$scope.nRounds = 2;
		$scope.nCurRound = 1; // current round start value
		$scope.nAllTime = 0;
		$scope.message = 'Готов?';

		$scope.nTimer = 0;
		$scope.nTotal = 0;
		$scope.nCount = 0;*/
		
		$scope.BaseEstimate = function() 
		{
			$scope.nStage = 1;
			$scope.nRounds = 2;
			$scope.nCurRound = 1; // current round start value
			$scope.nAllTime = 0;
			$scope.message = 'Готов?';

			$scope.nTimer = 0;
			$scope.nTotal = 0;
			$scope.nCount = 0;

			$scope.nBIn = $scope.nBase * $scope.aStagesize[0];
			if( $scope.bBPauseA )
			{ $scope.nBPause1 = $scope.nBIn + $scope.nBase * $scope.aStagesize[1] }
			else
			{ $scope.nBPause1 = $scope.nBIn }
			$scope.nBOut = $scope.nBPause1 + $scope.nBase * $scope.aStagesize[2];
			if( $scope.bBPauseB )
			{ $scope.nBPause2 = $scope.nBOut + $scope.nBase * $scope.aStagesize[3] }
			else
			{ $scope.nBPause2 = $scope.nBOut }
			
			// вычисленеи полного цикла со всеми стадиями 
			// доработка с исключениями вместо умножения на 9
			$scope.nAllTime = $scope.nBase * $scope.aStagesize[0];
			if ( $scope.bBPauseA ) { $scope.nAllTime = $scope.nAllTime + $scope.nBase * $scope.aStagesize[1] };
			$scope.nAllTime = $scope.nAllTime + $scope.nBase * $scope.aStagesize[2] 
			if ( $scope.bBPauseB ) { $scope.nAllTime = $scope.nAllTime + $scope.nBase * $scope.aStagesize[3] };
			$scope.nAllTime = $scope.nAllTime * $scope.nRounds; 
		}
		
		$scope.BaseEstimate();
		
		$scope.bBPauseA = true;
		$scope.bBPauseB = true;
		
		$scope.nCurrent = $scope.nBIn;
		

		$scope.TimerUp = function() { 
			$scope.nTimer = $scope.nTimer + 1; 
			}
		
		$scope.TimerStart = function() { 
			 $scope.BaseEstimate();
			 $scope.message = "Вдох";
			 //$interval( $scope.TimerUp(), 100, 10 ); why doesn't work ?!! Just if included function?
			 
			var Timer = $interval( function() 
			{
				if ( $scope.bBPauseA && $scope.nTimer == $scope.nBIn ) { 
				//$scope.nTimer = 0;
				$scope.nStage = 2;
				$scope.message = "Пауза A";
				$scope.nCurrent = $scope.nBPause1;
				$scope.nCount = 0;
				}
				
				if ( $scope.nTimer == $scope.nBPause1 ) { 
				//$scope.nTimer = 0;
				$scope.nStage = 3;
				$scope.message = "Выдох";
				$scope.nCurrent = $scope.nBOut;
				$scope.nCount = 0;
				}
				
				if ( $scope.bBPauseB && $scope.nTimer == $scope.nBOut ) { 
				//$scope.nTimer = 0;
				$scope.nStage = 4;
				$scope.message = "Пауза Б";
				$scope.nCurrent = $scope.nBOut;
				$scope.nCount = 0;
				}
				
				if ( $scope.nTimer == $scope.nBPause2 ) { 
				$scope.nTimer = 0;
				$scope.nStage = 1;
				$scope.message = "Вдох";
				$scope.nCurrent = $scope.nBIn;

				$scope.nCount = 0;
				$scope.nCurRound = $scope.nCurRound + 1;
				}

				$scope.nTotal = $scope.nTotal + 1;
				$scope.nTimer = $scope.nTimer + 1;
				$scope.nCount = $scope.nCount + 1;
				
				console.log( "Round: " + $scope.nCurRound + 
							" Stage: " + $scope.aStageName[ $scope.nStage-1 ] + 
							" : nCount = " + ($scope.nCount + 0) )

			}, $scope.nSpeed, ($scope.nAllTime) );
		$scope.Timer = Timer;
		
		$scope.TimerStop = function() { 
			$interval.cancel( $scope.Timer )
			console.log("Stop on: " + $scope.nTotal + " of " + $scope.nAllTime )
			//console.log("Log stop: ",, $scope.Timer ) // check Timer object
			}
		
	}


}]);



