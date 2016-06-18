app.factory("gameStorage", function($q, $http, firebaseURL, GBAPI, AuthFactory){

  var searchGiantBombDatabase = (gameTitle) => {
    var items = [];
    console.log(GBAPI)
    return $q(function(resolve, reject){
      $http.jsonp(`http://www.giantbomb.com/api/search/?api_key=${GBAPI}&query=${gameTitle}&resources=game&field_list=game&field_list=name,id,deck,platform,image,original_release_date,developers&format=jsonp&json_callback=angular.callbacks._0`)
      
        .success(function(gameObject){
          var searchResults = gameObject;
          items.push(searchResults);
          resolve(items[0]);
        })//success
    })//$q
  };

  var searchGBForGame = (uniqueGameID) => {
    var items = [];
    console.log('retrieving specific id from GB', uniqueGameID);
    return $q(function(resolve, reject){
      // $http({
      //   method: 'JSONP',
      //   url: `http://www.giantbomb.com/api/game/3030-${uniqueGameID}/?api_key=${GBAPI}&format=jsonp&`+'?callback=JSONP_CALLBACK'
      // })
      // $http.jsonp(`http://www.giantbomb.com/api/game/3030-${uniqueGameID}/?api_key=${GBAPI}&format=jsonp&json_callback=callback`)
      $http.jsonp(`http://www.giantbomb.com/api/game/3030-${uniqueGameID}/?api_key=${GBAPI}&format=jsonp&json_callback=JSON_CALLBACK`)
        .success(function(gameObject){
          items.push(gameObject);
          resolve(items[0]);
          console.log(items);
        })//success
        .error(function(error){
        reject(error);
      });
    })//$q
  }

  var addGBGameResultToFirebase = (title) => {
    console.log(title)

  }



return {searchGiantBombDatabase: searchGiantBombDatabase, searchGBForGame:searchGBForGame, addGBGameResultToFirebase:addGBGameResultToFirebase}

})//factory