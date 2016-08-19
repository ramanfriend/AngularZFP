//This is main module for dashboard 
var HomeApp = angular.module('HomeModule', []);

//This is helper method to add controller in poc module
function AddController(controllerName, controller) {
    HomeApp.controller(controllerName, controller);
}