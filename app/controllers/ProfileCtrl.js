"use strict";
app.controller("ProfileCtrl", function($scope, $http, gameStorage, AuthFactory, md5){
  $scope.email = AuthFactory.getEmail();
  $scope.gravatarHash = md5.createHash($scope.email);
  $scope.userPoints = 0;

  $scope.getPoints = () => {
    let user = AuthFactory.getUser();
    gameStorage.getPlayerTotalPoints()
      .then(function(gamesWithPointValues){
        Object.keys(gamesWithPointValues).forEach(function(key){
          if (gamesWithPointValues[key].gameObject.uid === user.uid && gamesWithPointValues[key].gameObject.completed === true){
            $scope.userPoints += gamesWithPointValues[key].gameObject.completion_value;
          }
        })
      })
  } 
  $scope.getPoints();

  $scope.$watch('email', function() {
    $scope.message = `e-mail hash = ${md5.createHash($scope.email || '')}`
  });
  
});