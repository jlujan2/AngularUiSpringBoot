'use strict'
var module = angular.module('login',['ngRoute']);


module.controller("LoginController",
	function($scope, $location) {
	$scope.user = {
		name:null,
		password:null
	};
	
	$scope.login = function() {
		
		if($scope.user.name == 'admin' && $scope.user.password == 'admin') {
			console.log("in login");
			$location.path('/home');
		}
		
	}
});