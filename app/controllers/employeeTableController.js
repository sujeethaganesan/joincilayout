app.controller('employeeTableController', ['$scope', '$http', employeeTableController]);

function employeeTableController($scope, $http) {
    var ind;

/*The contents are fetched from json*/
    $http.get('assets/data/data.json')
        .success(function(resp) {
            $scope.save = true;
            $scope.up = false;
            $scope.isDisabled = false;

            console.log(resp);
            $scope.employee = resp;
            $scope.details = localStorage.getItem("details") ? JSON.parse(localStorage.getItem("details")) : $scope.employee.employeeList_1;
            console.log($scope.employee.employeeList_1);
            var item = 'details';

            /*details feteched from json is stored in localstorage*/
            localStorage.setItem(item, JSON.stringify($scope.details));
            console.log($scope.item1);

            $scope.iderror = function() {

                $scope.EmpIdError = false;
                angular.forEach($scope.details, function(key, val) {
                    localStorage.setItem("a", key.EmployeeID);
                    if ($scope.empId == localStorage.getItem("a")) {
                        $scope.EmpIdError = true;
                        $scope.empId = "";

                    }



                })
            }

            /*Adding the details from form to local storage function*/
            $scope.addPerson = function() {
                //console.log($scope.empId);
                var list = {
                    EmployeeID: $scope.empId,
                    EmployeeName: $scope.empName,
                    Title: $scope.empTitle,
                    Competency: $scope.empCompetency,
                    Position: $scope.empPosition,
                    ContactNo: $scope.empMobile,
                    BloodGroup: $scope.empBgroup,
                    Address: $scope.empAddress


                }
                console.log(list); /* current values*/




                $scope.details.push(list);
                localStorage.setItem(item, JSON.stringify($scope.details));
                $scope.empId = ""; /*to empty the text box*/
                $scope.empName = "";
                $scope.empTitle = "";
                $scope.empCompetency = "";
                $scope.empPosition = "";
                $scope.empMobile = "";
                $scope.empBgroup = "";
                $scope.empAddress = " ";
            }
           /* edit function to edit the details from the table*/
            $scope.editDetails = function(list) {
               

                $scope.getPerson = function(index) { /*getting the index of the clicked row*/
                        ind = index;
                        console.log(ind);
                    }
                    
                $scope.save = false;
                $scope.up = true;
                $scope.empId = list.EmployeeID;
                $scope.empName = list.EmployeeName;
                $scope.empTitle = list.Title;
                $scope.empPosition = list.Position;
                $scope.empCompetency = list.Competency;
                $scope.empMobile = list.ContactNo;
                $scope.empBgroup = list.BloodGroup;
                $scope.empAddress = list.Address;
                $scope.button = true;
               /* update function to store the details back to local storage after edit*/
                $scope.updatePerson = function() {



                    $scope.button = false;
                    $scope.save = true;
                    $scope.up = false;

                    var list = {

                        EmployeeID: $scope.empId,
                        EmployeeName: $scope.empName,
                        Title: $scope.empTitle,
                        Position: $scope.empPosition,
                        Competency: $scope.empCompetency,
                        ContactNo: $scope.empMobile,
                        BloodGroup: $scope.empBgroup,
                        Address: $scope.empAddress



                    }
                    $scope.upPerson = function(index) {
                        console.log(ind)
                        $scope.details.splice(ind, 1, list);

                        localStorage.setItem(item, JSON.stringify($scope.details));
                    }



                    $scope.empId = ""; /*to empty the text box*/
                    $scope.empName = "";
                    $scope.empTitle = "";
                    $scope.empCompetency = "";
                    $scope.empPosition = "";
                    $scope.empMobile = "";
                    $scope.empBgroup = "";
                    $scope.empAddress = " ";



                }
            }

        })
        /*success ends*/


    .error(function() {
        console.log('error');
    });


}