/**
 * Created by Ajay Arjun on 10/2/2016.
 */
var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $http) {
    $scope.click = function () {
        $http.get("https://cse5335-axb3015.herokuapp.com/json")
            .success(function (response) {
                $scope.mydata = response;
            })
            .error(function (response) {
                console.log("Error" + response.status);
            })
    }
});

app.controller('graph',function ($scope,$http) {
    $scope.click = function () {
        $http.get("https://cse5335-axb3015.herokuapp.com/graphdata")
            .then(function (response) {
                $scope.rows = response;
                drawChart(response);
            });
    }
});


function drawChart(response) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    console.log(rows);
    for (r in response) {
        data.addRow([response[r].label, response[r].count]);
    }
    var options = {
        'title': 'How Much Pizza I Ate Last Night',
        'width': 500,
        'height': 300
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('ajay'));
    chart.draw(data, options);
}