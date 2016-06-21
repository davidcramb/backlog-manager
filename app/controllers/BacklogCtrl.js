"use strict";
app.controller('BacklogCtrl', function($scope, $http, AuthFactory, gameStorage){

  $scope.backlogList = [];


  $scope.populatePage = () => {
    let user = AuthFactory.getUser();
    console.log(user.uid)
    gameStorage.populateBacklogPage()
      .then(function(gamesList){
        Object.keys(gamesList).forEach(function(key){
          // console.log(gamesList[key].gameObject)
          if (gamesList[key].gameObject.uid === user.uid){
            $scope.backlogList.push(gamesList[key].gameObject);
          }//if
        })//forEach       
        console.log($scope.backlogList)
      })//then
  };
  $scope.populatePage();


});