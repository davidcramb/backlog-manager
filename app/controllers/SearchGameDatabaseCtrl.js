"use strict";
app.controller('SearchGameDatabaseCtrl', function($scope, $http, gameStorage){

  $scope.searchForGameName = "";
  $scope.searchForGameNameResults = [];

  $scope.searchGameDatabase = () => {
    console.log('searching for Game:', $scope.searchForGameName)
    gameStorage.searchGiantBombDatabase($scope.searchForGameName)
      .then(function(searchResults){
        $scope.searchForGameNameResults = searchResults.results;
        console.log($scope.searchForGameNameResults);
      });
  }; //searchGameDatabase

  $scope.addGametoUserBacklog = (uniqueGameID, title) => {
    console.log('adding title to backlog ->', title);
    console.log('Unique ID ->', uniqueGameID);
    gameStorage.searchGBForGame(uniqueGameID)
      .then(function(result){
        gameStorage.addGBGameResultToFirebase(result)
      });//then result
  }; //addGametoUserBacklog


})//controller