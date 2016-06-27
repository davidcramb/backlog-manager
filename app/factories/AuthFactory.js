"use strict";
app.factory("AuthFactory", function($http, firebaseURL) {
  let ref = new Firebase(firebaseURL);
  let currentUserData = null;

  return {
    isAuthenticated () {
      let authData = ref.getAuth();
      return (authData) ? true : false;
    },

    getUser() {
      return currentUserData;
    },

    authenticate(credentials) {
      return new Promise((resolve, reject) => {
        ref.authWithPassword({
          "email":credentials.email,
          "password": credentials.password
        }, (error, authData) => {
          if (error) {
            reject(error);
          } else {
            console.log("authWithPassword method completed succesfully");
            currentUserData = authData;
            console.log(currentUserData)
    
            resolve(authData);
          }
        });
        });
      },

      storeUser(authData) {
        console.log(authData)
        let stringifiedUser = JSON.stringify({ uid: authData.id });
        return new Promise((resolve, reject) => {
          $http
            .post(`${firebaseURL}/users.json`, authData)
            .then(
              res => resolve(res),
              err => reject(err)
            );
        });
      }
   }
});
