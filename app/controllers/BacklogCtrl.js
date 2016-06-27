"use strict";
app.controller('BacklogCtrl', function($scope, $http, AuthFactory, gameStorage){

  $scope.backlogList = [];
  $scope.identifier = [];
  $scope.completedGames = [];
  $scope.gamePointValue = "";


  $scope.populatePage = () => {
    let user = AuthFactory.getUser();

    gameStorage.populateBacklogPage()
      .then(function(gamesList){
        Object.keys(gamesList).forEach(function(key){

          if (gamesList[key].gameObject.uid === user.uid && gamesList[key].gameObject.completed === false){
            gamesList[key].gameObject.firebaseID = key;
            $scope.backlogList.push(gamesList[key].gameObject);
          } else if (gamesList[key].gameObject.uid === user.uid && gamesList[key].gameObject.completed === true) {
            gamesList[key].gameObject.firebaseID = key;
            $scope.completedGames.push(gamesList[key].gameObject);
          };//if
        });//forEach       
        console.log($scope.backlogList)
      })//then
  };
  $scope.populatePage();

  //this function currently removes the game entirely from firebase, need to add function to prevent this from happening with multiple users
  $scope.userRemoveFromBacklogList = (gameID) => {
    console.log(gameID)
    let user = AuthFactory.getUser();
    gameStorage.deleteGameTitle(gameID)
      .then(function(game){
        $scope.backlogList = [];
        $scope.populatePage();
      })//then
  };

  $scope.userCompletedGame = (firebaseID, gameTitle, game) => {
    let user = AuthFactory.getUser();
    console.log('Updating game as complete', gameTitle);
    let gameObject = {
          title: game.title,
          platform: game.platform,
          genre: game.genres,
          developers: game.developers,
          boxart: game.boxart,
          id: game.id,
          uid: user.uid,
          completed: true,
          date_added: game.date_added,
          date_completed: new Date(),
          firebaseID: game.firebaseID,
        };
      $scope.calculatePoints(game.date_added, game.date_completed);

    gameStorage.updateGameAsCompleted(firebaseID, gameObject)
      .then(function(result){
        $scope.moveGametoCompletedList(game);
        console.log('moving game object', game)
        $scope.backlogList = [];

        $scope.populatePage();
      });//then
  };

  $scope.moveGametoCompletedList = (gameObject) => {
    $scope.completedGames.push(gameObject);
  };

  $scope.calculatePoints = (date_added_to_backlog, date_completed) => {
    console.log(date_added_to_backlog);
    console.log(date_completed);
  }

  $scope.populateCompletedGamesList = () =>{
    let user = AuthFactory.getUser();

  };//end

});