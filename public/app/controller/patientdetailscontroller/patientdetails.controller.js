//This controller is responsible to insert new patient details in DB
function patientdetailsctrl($scope, $http, HttpPost,$stateParams) {   
    var configSetting = { headers: { 'Content-Type': 'application/json', 'TenantCode': 'Tenant' } };  
     $scope.portfolioId = $stateParams.PId;
     $scope.dataobj;
    $scope.BindPatientDetails = function ()
    {
        console.log("Bind Patient Details method called");
          var param = $stateParams.PId;
          HttpPost.CallHttpGet('/patientdetails', param)
           .success(function (obj) { 
               $scope.dataobj = obj;             
               console.log($scope.dataobj);
               return "true";               
           }).error(function (er) {
               console.log("Bind Patient Details Error " + er);
           }).catch(function (ex) {               
               console.log("Bind Patient Details Exception ", ex);
           }).then(function (response) {
               if (response != null) {
                   var time = response.config.responseTimestamp - response.config.requestTimestamp;
                   console.log('The request took ' + (time / 1000) + ' seconds.');
               }
           });
    }   

    $scope.BindPatientDetails(); 
    
} 

//This helper function will add Patient Details controller to Home module.
AddPatientDetailsController('patientdetailsctrl', ['$scope', '$http', 'HttpPost','$stateParams', patientdetailsctrl]);

