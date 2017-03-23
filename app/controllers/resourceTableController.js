app.controller('resourceTableController', ['$scope', '$http', resourceTableController]);

function resourceTableController($scope, $http) {
    /* binding checkList value*/
    $scope.roles = ['HTML', 'CSS', 'Java Script', 'JQ', 'Flash', 'Flex'];
    $scope.selection = ['HTML'];
    $scope.toggleSelection = function toggleSelection(role) {
        var idx = $scope.selection.indexOf(role);


        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        } else {
            $scope.selection.push(role);
        }
        console.log($scope.selection);
    }; /* end of checklist functionality*/

    $http.get('assets/data/data.json')
        .success(function(resp) {
            /*storing values in localStorage from json*/
            $scope.requestList = resp;
            $scope.requestDetails = localStorage.getItem("requestDetails") ? JSON.parse(localStorage.getItem("requestDetails")) : $scope.requestList.ResourceList;
            console.log($scope.requestList.ResourceList);
            var resourceItem = 'requestDetails';


            localStorage.setItem(resourceItem, JSON.stringify($scope.requestDetails));
            $scope.save = true;
            /*pushing values into localStorage while entering*/
            $scope.addRole = function() {

                var count = $scope.requestDetails.length + 1;

                console.log(count);

                var data = {
                    RequestID: "WEB00" + count + "",
                    Designation: $scope.roleName,
                    Position: $scope.rolePos,
                    No: $scope.roleExp,
                    Competency: $scope.roleComp,
                    Location: $scope.roleLoc,
                    Numbers: $scope.roleNum,
                    Skills: $scope.selection

                }
                console.log(data);
                $scope.requestDetails.push(data);
                localStorage.setItem(resourceItem, JSON.stringify($scope.requestDetails));
                console.log("hhh" + resourceItem);
                $scope.roleId = "";
                $scope.roleName = "";
                $scope.rolePos = "";
                $scope.roleExp = "";
                $scope.roleComp = "";
                $scope.roleLoc = "";
                $scope.roleNum = "";
                $scope.selection = "";
            }
            /* edit function to edit the details from the table*/
            $scope.editRole = function(data) {
                $scope.getRole = function(index) {
                    arr = index;
                    console.log(arr);
                }
                $scope.save = false;
                $scope.update = true;
                $scope.roleId = data.RequestID;
                $scope.roleName = data.Designation;
                $scope.rolePos = data.Position;
                $scope.roleExp = data.No;
                $scope.roleComp = data.Competency;
                $scope.roleLoc = data.Location;
                $scope.roleNum = data.Numbers;
                $scope.selection = data.Skills;
                /* update function to store the details back to local storage after edit*/
                $scope.updateRole = function() {




                    $scope.save = true;
                    $scope.update = false;

                    var data = {
                        RequestID: $scope.roleId,
                        Designation: $scope.roleName,
                        Position: $scope.rolePos,
                        No: $scope.roleExp,
                        Competency: $scope.roleComp,
                        Location: $scope.roleLoc,
                        Numbers: $scope.roleNum,
                        Skills: $scope.selection

                    }

                    $scope.upRole = function(index) {
                        console.log(arr)
                        $scope.requestDetails.splice(arr, 1, data);

                        localStorage.setItem(resourceItem, JSON.stringify($scope.requestDetails));
                    }



                    $scope.roleId = "";
                    $scope.roleName = "";
                    $scope.rolePos = "";
                    $scope.roleExp = "";
                    $scope.roleComp = "";
                    $scope.roleLoc = "";
                    $scope.roleNum = "";
                    $scope.selection = "";


                }
            }


        })
        .error(function() {
            console.log('error');
        });
}