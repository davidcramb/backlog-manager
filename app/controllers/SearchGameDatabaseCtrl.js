"use strict";
app.controller('SearchGameDatabaseCtrl', function($document, $scope, $http, gameStorage,AuthFactory){

  $scope.searchForGameName = "";
  $scope.searchForGameNameResults = [];
  $scope.gamesFilteredByUID = [];
  
  $scope.searchGameDatabase = () => {
    console.log('searching for Game:', $scope.searchForGameName)
    gameStorage.searchGiantBombDatabase($scope.searchForGameName)
      .then(function(searchResults){
        $scope.searchForGameNameResults = searchResults.results;
        $scope.filterResultsInBacklog($scope.searchForGameNameResults)
      })
  }; //searchGameDatabase

  //takes results that already exist in backlog, styles the card and disables the button
  $scope.filterResultsInBacklog = (title) => {
    let user = AuthFactory.getUser();
    gameStorage.populateBacklogPage()
      .then(function(gamesList){
        Object.keys(gamesList).forEach(function(key){
        if (gamesList[key].gameObject.uid === user.uid){
          Object.keys($scope.searchForGameNameResults).forEach(function(key2){
            if ($scope.searchForGameNameResults[key2].id === gamesList[key].gameObject.id){
              $scope.disableCardInBacklog($scope.searchForGameNameResults[key2].id);
            };
          });
        };
      });
    });
  };

  $scope.disableCardInBacklog = (gameID) => {
    let gameToStyle = $document[0].getElementById(`${gameID}`)
    console.log(gameToStyle)
    gameToStyle.setAttribute("id", "game-search-card-selected")
    gameToStyle.remove() // hell with it just remove the damn thing

  };



  $scope.gameCardSelected = (title, button, card) => {
    var buttonToDisable = button[0];
    var cardToStyle = card[1];
    Materialize.toast(`${title} added to backlog`, 2500)
    cardToStyle.setAttribute("id", "game-search-card-selected");
    buttonToDisable.setAttribute("class", "disabled");
  };


  $scope.addGametoUserBacklog = (uniqueGameID, title, $event) => {
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
          completed: false,
          date_added: new Date()
        };

        $scope.gameCardSelected(gameObject.title, angular.element($event.currentTarget),angular.element($event.currentTarget).parents())

        gameStorage.addGBGameResultToFirebase(gameObject);
      });//then result
  }; //addGametoUserBacklog


})//controller