/**
 * Created by Ajay Arjun on 10/2/2016.
 */

var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
    $scope.click = function () {
        $http.get("https://cse5335-axb3015.herokuapp.com/json")
            .then(function (response) {
                $scope.mydata =response;
            },function(response){
                alert(response.status)
                console.log(response.status);
            });

        }
});