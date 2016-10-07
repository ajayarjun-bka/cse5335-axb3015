/**
 * Created by Ajay Arjun on 10/2/2016.
 */
function help() {
    alert("HELLO FROM THE OTHER SIDE");
}
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
    $scope.click = function () {
        $scope.sample = ["a","b","c"];
        //$http.get("https://cse5335-axb3015.herokuapp.com/json")
        $http.get("https://localhost:5000/json")
            .success(function (response) {
                $scope.mydata = response;
            });
        var tab = document.getElementById("table")
        tab.innerHTML='<table><th>Data</th><tr ng-repeat="person in mydata"><td>{{person}}</td></tr></table>';

    }
});