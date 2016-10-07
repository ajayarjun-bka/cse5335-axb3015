/**
 * Created by Ajay Arjun on 10/2/2016.
 */
function help() {
    alert("HELLO FROM THE OTHER SIDE");
}
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
    $scope.click = function () {
        $http.get("https://cse5335-axb3015.herokuapp.com/jsn")
            .then(function (response) {
                $scope.mydata =response;
            },function(response){
                var temp=document.getElementById('tab')
                temp.innerHTML="<h3>Error from server</h3>+response"
            });

        }
});