  "use strict";
app.factory("gameStorage", function($q, $http, firebaseURL, GBAPI, AuthFactory){

  var searchGiantBombDatabase = (gameTitle) => {
    var items = [];
    return $q(function(resolve, reject){
      // $http.jsonp(`http://www.giantbomb.com/api/search/?api_key=${GBAPI}&query=${gameTitle}&resources=game&field_list=game&field_list=name,id,deck,platform,image,original_release_date,developers&format=jsonp&json_callback=angular.callbacks._0`)
      $http.jsonp(`http://www.giantbomb.com/api/search/?api_key=${GBAPI}&query=${gameTitle}&resources=game&field_list=game&field_list=name,id,deck,platform,image,original_release_date,developers&format=jsonp&json_callback=JSON_CALLBACK`)
        .success(function(gameObject){
          var searchResults = gameObject;
          items.push(searchResults);
          resolve(items[0]);
        });//success
    });//$q
  };

  var searchGBForGame = (uniqueGameID) => {
    var items = [];
    return $q(function(resolve, reject){
       $http.jsonp(`http://www.giantbomb.com/api/game/3030-${uniqueGameID}/?api_key=${GBAPI}&format=jsonp&json_callback=JSON_CALLBACK`)
        .success(function(gameObject){
          items.push(gameObject.results);
          resolve(items[0]);
        })//success
        .error(function(error){
        reject(error);
      });
    })//$q
  };

  var addGBGameResultToFirebase = (gameObject) => {
    return $q(function(resolve, reject){
      $http.post(
        `${firebaseURL}games.json`,
        JSON.stringify({gameObject
        }) //stringify
      ).success(
        function(objectFromFirebase){
          resolve(objectFromFirebase);
        });//success
    });//q
  };

//may also function as a getter
  var populateBacklogPage = () => {
    return $q(function(resolve, reject){
      $http.get(`${firebaseURL}games.json`)
        .success(function(firebaseObject) {
          let itemCollection = firebaseObject;
          resolve(itemCollection);
        })//success
    })//$q
  };

  var deleteGameTitle = (gameID) => {
    return $q(function(resolve, reject){
      $http.delete(`${firebaseURL}games/${gameID}.json`)
        .success(function(objectFromFirebase){
          resolve(objectFromFirebase);
        });//success
    });//q
  };

  var updateGameAsCompleted = (firebaseID, gameObject) => {
    return $q(function(resolve, reject){
      $http.put(
        `${firebaseURL}games/${firebaseID}.json`,
        JSON.stringify({gameObject})
        )
      .success(function(firebaseObject){
        resolve(firebaseObject);
      });//success
    });//q
  };

  var getPlayerTotalPoints = () => {  
    return $q(function(resolve, reject){
      $http.get(
        `${firebaseURL}games.json`)
        .success(function(firebaseObject){
          let pointGenerator = firebaseObject;
          resolve(pointGenerator);
        });
    });
  };



return {
  searchGiantBombDatabase: searchGiantBombDatabase,
  searchGBForGame:searchGBForGame,
  addGBGameResultToFirebase:addGBGameResultToFirebase,
  populateBacklogPage: populateBacklogPage,
  deleteGameTitle: deleteGameTitle,
  updateGameAsCompleted: updateGameAsCompleted,
  getPlayerTotalPoints: getPlayerTotalPoints
}

})//factory