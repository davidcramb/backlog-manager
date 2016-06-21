"use strict";
app.controller('BacklogCtrl', function($scope, $http, AuthFactory, gameStorage){

  $scope.backlogList = [];
  $scope.identifier = [];


  $scope.populatePage = () => {
    let user = AuthFactory.getUser();
    console.log(user.uid)
    gameStorage.populateBacklogPage()
      .then(function(gamesList){
        Object.keys(gamesList).forEach(function(key){
          // console.log(gamesList[key].gameObject)
          if (gamesList[key].gameObject.uid === user.uid){
            gamesList[key].gameObject.firebaseID = key;
            $scope.backlogList.push(gamesList[key].gameObject);
          }//if
        })//forEach       
        console.log($scope.backlogList)
      })//then
  };
  $scope.populatePage();

  //this function currently removes the game entirely from firebase, need to add function to prevent this from happening with multiple users
  $scope.userRemoveFromBacklogList = (gameID) => {
    console.log(gameID)
    let user = AuthFactory.getUser();
    gameStorage.deleteGameTitle(gameID)
      .then(function(result){
        $scope.backlogList = [];
        $scope.populatePage();

      })//then
  }


});