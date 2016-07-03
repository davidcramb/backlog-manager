"use strict";
app.controller("ProfileCtrl", function($scope, $http, gameStorage, AuthFactory, md5){
  $scope.email = AuthFactory.getEmail();
  $scope.gravatarHash = md5.createHash($scope.email);

  $scope.$watch('email', function() {
    $scope.message = `e-mail hash = ${md5.createHash($scope.email || '')}`
  });
  
});