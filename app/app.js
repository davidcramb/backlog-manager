"use strict";

var app = angular.module('BacklogManager', ['ngRoute', 'ngMd5'])
  .constant("firebaseURL", "https://dcc-backlogmanager.firebaseio.com/")
  .constant("GBAPI", "57fa396fabb7fb0d28c385648e2707007857248f");

  let isAuth = (AuthFactory) => new Promise ((resolve, reject) => { 
    if (AuthFactory.isAuthenticated()){
      console.log('User Authenticated, resolving promise');
      resolve();
    } else {
      console.log('Authentication Failed, rejecting promise');
      reject();
    }
  });

app.config(function($routeProvider){
  $routeProvider.
  when('/', {
    templateUrl:'partials/profile.html',
    controller:'ProfileCtrl',
    resolve: {isAuth}
  }).
  when('/profile', {
    templateUrl:'partials/profile.html',
    controller:'ProfileCtrl',
    resolve: {isAuth}
  }).
  when('/search', {
    templateUrl: 'partials/search.html',
    controller: 'SearchGameDatabaseCtrl'
  }).
  when('/community', {
    templateUrl:'partials/community.html',
    controller: ''
  }).
  when('/backlog', {
    templateUrl:'partials/backlog.html',
    controller: 'BacklogCtrl',
    resolve: {isAuth}
  }).
  when('/completed', {
    templateUrl: 'partials/completed.html',
    controller: 'CompletedCtrl',
    resolve: {isAuth}
  }).
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  }).
  when('/logout', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  }).
  otherwise('/');
});

app.run(($location) => {
  let movieRef = new Firebase("https://groovymovie.firebaseio.com/");
    movieRef.unauth();
  movieRef.onAuth(authData => {
    if(!authData){
      $location.path("/login");
    };  
  })
})