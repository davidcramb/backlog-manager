"use strict";
app.controller('SearchGameDatabaseCtrl', function($scope, $http, gameStorage,AuthFactory){

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
        let user = AuthFactory.getUser();
        let gameObject = {
          title: result.name,
          platform: result.platforms[0].name,
          genre: result.genres[0].name,
          developers: result.developers[0].name,
          boxart: result.image.small_url,
          id: result.id,
          uid: user.uid,
          completed: false
        };
        gameStorage.addGBGameResultToFirebase(gameObject);
      });//then result
  }; //addGametoUserBacklog


})//controller