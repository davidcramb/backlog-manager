"use strict";
var app = angular.module('BacklogManager', ['ngRoute'])
  .constant("firebaseURL", "https://dcc-backlogmanager.firebaseio.com/");

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
    controller:'Profile',
    resolve: {isAuth}
  }).
  when('/profile', {
    templateUrl:'partials/profile.html',
    controller:'ProfileCtrl',
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