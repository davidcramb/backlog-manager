app.controller('CompletedCtrl', function($scope, $http, AuthFactory, gameStorage){
  $scope.completedGames = [];

    $scope.populatePage = () => {
    let user = AuthFactory.getUser();
    console.log(user.uid)
    gameStorage.populateBacklogPage()
      .then(function(gamesList){
        Object.keys(gamesList).forEach(function(key){
          if (gamesList[key].gameObject.uid === user.uid && gamesList[key].gameObject.completed === true) {
            gamesList[key].gameObject.firebaseID = key;
            $scope.completedGames.push(gamesList[key].gameObject);
          };//if
        });//forEach       
        console.log($scope.completedGames)
      })//then
  };
  $scope.populatePage();
});