//This controller is responsible for Home Page
function homectrl($scope, $http, HttpPost) {   
    var configSetting = { headers: { 'Content-Type': 'application/json', 'TenantCode': 'Tenant' } }; 

    $scope.searchlist = "";  
    $scope.searchparam ="";   
    
    $scope.BindData = function ()
    {
        console.log("Bind Data method called");
          HttpPost.CallHttpGet('/searchlist', "")
           .success(function (obj) { 
               $scope.dataobj = obj;             
               console.log($scope.dataobj);
               return "true";               
           }).error(function (er) {
               console.log("Bind Data Error " + er);
           }).catch(function (ex) {               
               console.log("Bind Data Exception ", ex);
           }).then(function (response) {
               if (response != null) {
                   var time = response.config.responseTimestamp - response.config.requestTimestamp;
                   console.log('The request took ' + (time / 1000) + ' seconds.');
               }
           });
    }
     
    $scope.BindSearchData = function ()
    {
        console.log("Bind Data method called");
          var pname = $scope.searchparam.name==""|| $scope.searchparam.name=="undefined"?"null":$scope.searchparam.name;
          var dofb = $scope.searchparam.dob==""|| $scope.searchparam.dob=="undefined"?"null":$scope.searchparam.dob;
          var Contact = $scope.searchparam.contact==""|| $scope.searchparam.contact=="undefined"?"null":$scope.searchparam.contact;       
          var param = pname +'/'+dofb +'/'+Contact;
          HttpPost.CallHttpGet('/searchlist', param)
           .success(function (obj) { 
               $scope.dataobj = obj;             
               console.log($scope.dataobj);
               return "true";               
           }).error(function (er) {
               console.log("Bind Data Error " + er);
           }).catch(function (ex) {               
               console.log("Bind Data Exception ", ex);
           }).then(function (response) {
               if (response != null) {
                   var time = response.config.responseTimestamp - response.config.requestTimestamp;
                   console.log('The request took ' + (time / 1000) + ' seconds.');
               }
           });
    }     

    $scope.$on('onRepeatLast', function (scope, element, attrs) {       
        $('#example').DataTable();
    });

    $scope.BindData(); 
}

//This helper function will add Home Page controller to Home module.
AddController('homectrl', ['$scope', '$http', 'HttpPost', homectrl]);

