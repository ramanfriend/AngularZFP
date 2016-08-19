//This is main module for dashboard 
var NewPatientApp = angular.module('NewPatientModule', []);

//This is helper method to add controller in New Patient module
function AddPatientController(controllerName, controller) {
    NewPatientApp.controller(controllerName, controller);
}