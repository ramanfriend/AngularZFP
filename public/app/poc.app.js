//This is the main module of POC application

var myApp = angular.module("PocApp", ['ui.router', 'HomeModule','NewPatientModule','PatientDetailsModule','DicomParserModule']);

myApp.config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $httpProvider) {
    $httpProvider.interceptors.push('timestampMarker');
    $urlMatcherFactoryProvider.caseInsensitive(true);   
    $urlRouterProvider.otherwise("/Index");   
    //set up the states
    $stateProvider
      .state('home', {
          url: "/Index",
          templateUrl: 'html/home.html',
          controller: 'homectrl'
      })
      .state('newpatient', {
             url: "/newpatient",
             templateUrl: 'html/contact.html',
             controller: 'newpatientctrl'
         })
          .state('dicomparser', {
             url: "/dicomparser",
              params: {
              fileId: null,
             },
             templateUrl: 'html/dicom.html',
             controller: 'dicomparserctrl'
         })
         .state('patientdetails', {
             url: "/patientdetails",
              params: {
              PId: null,
             },
             templateUrl: 'html/PatientDetails.html',
             controller: 'patientdetailsctrl'
            
         });
}]);

myApp.factory('timestampMarker', ['$log', function ($log) {
    $log.debug('$log is here to show you that this is a regular factory with injection');
    var timestampMarker = {
        request: function (config) {            
            config.requestTimestamp = new Date().getTime();            
            return config;
        },
        response: function (response) {           
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return timestampMarker;
}]);

myApp.factory('HttpPost', ['$http', function ($http) {
    var factory = {};
    factory.CallHttpPost = function (APIUrl, Param, Configsetting)
    {
        return $http.post(APIUrl, Param, Configsetting);
    }

    factory.CallHttpGet = function (APIUrl, Param, Configsetting)
    {
        return $http.get(APIUrl + '/' + Param, Configsetting);        
    }
    return factory;
}]);

myApp.directive('onLastRepeat', function () {
    return function (scope, element, attrs) {
        if (scope.$last) setTimeout(function () {
            scope.$emit('onRepeatLast', element, attrs);
        }, 1);
    };
});