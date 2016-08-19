//This controller is responsible to insert new patient details in DB
function newpatientctrl($scope, $http, HttpPost) {   
    var configSetting = { headers: { 'Content-Type': 'application/json', 'TenantCode': 'Tenant' } };  

    $scope.searchlist = "";  
    $scope.searchparam ="";
    $scope.submitsucces ="";
    // $scope.dataobj =[];
    $scope.SubmitData = function () {       
        console.log($scope.searchlist);
        var data =$scope.searchlist;        
         try {           
            HttpPost.CallHttpPost('/searchlist', data, configSetting)
                .success(function (json) {
                    console.log("Data Submitted successfully");
                    console.log(json);
                    $scope.submitsucces="Data Submitted successfully";
                   // $scope.BindData();
                }).error(function (er) {
                    console.log("Submit Data Error" + er);
                });
        }
        catch (err)
        {
            console.log("Submit Data Exception" + err);
        }
    }   
    
} 

//This helper function will add Patient Details controller to Home module.
AddPatientController('newpatientctrl', ['$scope', '$http', 'HttpPost', newpatientctrl]);

