'use strict'
var module = angular.module('demo.controllers', []);

(function(){
	module.directive('onlyLettersInput', onlyLettersInput);
	
	function onlyLettersInput(){
		return{
			require: 'ngModel',
			link: function(scope, element, attr, UserController){
				function fromUser(text){
					var transformedInput = text.replace(/[^a-zA-Z]/g, '');
					if(transformedInput !==text) {
						UserController.$setViewValue(transformedInput);
						UserController.$render();
					}
					return transformedInput;
				}
				UserController.$parsers.push(fromUser);
			}
		};
	};
})();


module.controller("UserController", ["$http", "$scope", "UserService",
    function($http, $scope, UserService) {
	
	 $scope.temp;
     $scope.errorFlag = false;
     $scope.enabledEdit = [];
     $scope.toggle = true;
     $scope.errorEdit= false;
     $scope.errorfunc = function(){
    	 return $scope.errorFlag;
     }
     
     UserService.getAllUsers().then(function(value){
    	 $scope.allUsers = value.data;
    	 console.log($scope.allUsers);
     });
        
       $scope.saveUser = function() {
	   $scope.user = {
	            name: $scope.name,
	            lastName: $scope.lastName,
	            email: $scope.input
	        };
	   $scope.errorFlag = true;
    	console.log($scope.user);
	     UserService.saveUser($scope.user).then(function() {
	    	 $scope.errorFlag = false;
             UserService.getAllUsers().then(function(value) {
                 $scope.allUsers = value.data;
             }, function(reason) {
            	 console.log(reason);
            	 $scope.errorMessage = reason.data;
                 console.log("error occured adding");
             }, function(value) {
                 console.log("no callback");
             });
             $scope.user = {
                 name: null,
                 lastName: null,
                 email: null
             };
         }, function(reason) {
             console.log("error occured added");
             console.log(reason.data);
             console.log(reason.data.details);
             $scope.errorFlag = true;
             $scope.errorMessage = reason.data.message;
         }, function(value) {
             console.log("no callback");
         });
        }
        
        $scope.deleteUser = function(id) {
        	
        	UserService.deleteUser(id).then(function() {
               
                UserService.getAllUsers().then(function(value) {
                    $scope.allUsers = value.data;
                }, function(reason) {
                    console.log("error occured");
                }, function(value) {
                    console.log("no callback");
                });
        	}, function(reason) {
                console.log("error occured");
            }, function(value) {
                console.log("no callback");
            });
        	console.log(id);
        }
        
        $scope.editUser = function($index, toggle) {
        	
        	if(!toggle){
        		$scope.temp = angular.copy($scope.allUsers[$index]);
        		$scope.enabledEdit[$index] = true;
        	}
        	else{ 
        		var fields = [];
        		if($scope.temp.name!=$scope.allUsers[$index].name){
        			fields.push("name");
        		}
        		if($scope.temp.lastName!=$scope.allUsers[$index].lastName){
        			fields.push("lastName");
        		}
        		if($scope.temp.email!=$scope.allUsers[$index].email){
        			fields.push("email");
        		}
        		$scope.enabledEdit[$index] = false;
        		$scope.allUsers[$index].updateFields = fields;
        		UserService.updateUser($scope.allUsers[$index]).
        		then(function(response) {
        			console.log("updated sucessful");
        			$scope.errorEdit = false;
        		}, function(reason) {
        			$scope.allUsers[$index] = $scope.temp;
        			$scope.errorEdit = true;
               	 	$scope.editErrorMessage = reason.data.message;
        			console.log("error ocurred");
        		});
        	}
        	
        }
    }
]);