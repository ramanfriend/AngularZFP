

//This is main module for dashboard 
var DicomParserApp = angular.module('DicomParserModule', []);

//This is helper method to add controller in New Patient module
function AddDicomParserctrlController(controllerName, controller) {
    DicomParserApp.controller(controllerName, controller);
}