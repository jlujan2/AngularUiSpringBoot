'use strict'
var demoApp = angular.module('demo', ['ui.bootstrap', 'demo.controllers',
    'demo.services'
]);
demoApp.constant("CONSTANTS", {
    getUserByIdUrl: "http://localhost:8081/users/",
    getAllUsers: "http://localhost:8081/users",
    saveUser: "http://localhost:8081/users",
    deleteUser: "http://localhost:8081/users/",
    updateUser: "http://localhost:8081/users/update"
});