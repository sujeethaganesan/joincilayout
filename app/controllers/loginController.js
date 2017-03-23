app.controller('loginController', ['$rootScope', '$scope', '$location', '$http', loginController])

function loginController($rootScope, $scope, $location, $http) {

    $rootScope.loginPage = true;
    $scope.userNameError = false;
    $scope.passwordError = false;


    var username;
    var pwd;
    var count = 0;
    var myE1;
     $scope.highlightTab = function(val) {
        $scope.activeTab = val;
        console.log(val);
    }



    $http.get('assets/data/data.json')
        .success(function(resp) {
            $scope.servicerName = resp;
            
            $scope.EnterKeyPress = function($event)
        {
            
            var keyCode = $event.which || $event.keyCode;
                if (keyCode == 13) 
                  {
                    
                    $scope.validate();
                  }

        };  
            $scope.validate = function() { /*click function for login button*/
                username = $scope.userName;
                pwd = $scope.loginPassword;
                if (username == undefined) {
                    $scope.userNameError = true;
                    $scope.userError = "Please Enter The Username"
                }
                if (pwd == undefined) {
                    $scope.passwordError = true;
                    $scope.pwdError = "Please Enter The Password";
                    return;
                }


               
                angular.forEach($scope.servicerName.credentialsData, function(value, key) {
                    if (value.UserName == username) {
                        if (value.Password == pwd) {
                            console.log(value.UserRole);
                            if (value.UserRole == "HR-Manager") {
                                $rootScope.loginPage = false;
                                $rootScope.menu = true;
                                $location.path('employeesList');


                            } else if (value.UserRole == "HR-Staff") {
                                $rootScope.loginPage = false;
                                $rootScope.menu = true;
                                $location.path('employeesList');

                            } else if (value.UserRole == "Manager") {
                                $rootScope.loginPage = false;
                                $location.path('resourceRequest');
                                $rootScope.menu = true;
                            }

                        }
                    } else {
                        $scope.passwordError = true;
                        $scope.userNameError = false;
                        $scope.pwdError = "The user name or password you entered isn't correct. Try entering it again."
                        $scope.userName = "";
                        $scope.loginPassword = "";

                    }
console.log(value.UserRole);
                console.log(localStorage.getItem("Name"));
                if (localStorage.getItem("Name") == value.UserName) {

                    $scope.staffName = value.Fullname;
                    $scope.roleName = value.UserRole;
                    $scope.roleNameDisplay="["+$scope.roleName+"]";

                }
           

});
            $scope.tabs = $scope.servicerName.screens[$scope.roleName];
            $scope.activeTab = $scope.tabs ? $scope.tabs[0] : ''; 




            }
            $scope.loginError = function() /*Hiding error using ng-blur*/ {
                username = $scope.userName;
                pwd = $scope.loginPassword;
                localStorage.setItem("Name", username);
                localStorage.setItem("password", pwd);
                if (username != undefined) {
                    $scope.userNameError = false;
                    if (pwd != undefined) {
                        $scope.passwordError = false;
                    }
                }

            }

        }) /*success method ends */

    .error(function() {
        console.log('error');
    })


}