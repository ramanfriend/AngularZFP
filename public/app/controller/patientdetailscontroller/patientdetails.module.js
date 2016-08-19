//This is main module for dashboard 
var PatientDetailsApp = angular.module('PatientDetailsModule', []);

//This is helper method to add controller in New Patient module
function AddPatientDetailsController(controllerName, controller) {
    PatientDetailsApp.controller(controllerName, controller);
}