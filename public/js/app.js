/**
 * Created by Ajay Arjun on 10/2/2016.
 */
function help() {
    alert("HELLO FROM THE OTHER SIDE");
}
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
    $scope.click = function () {
        $http.get("https://cse5335-axb3015.herokuapp.com/json")
            .success(function (response) {
                $scope.mydata =response;
            });
        }
});