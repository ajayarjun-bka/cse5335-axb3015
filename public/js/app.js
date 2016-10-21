/**
 * Created by Ajay Arjun on 10/2/2016.
 */
var app = angular.module('myApp', []);
//google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(drawChart);


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


app.controller('graph', function ($scope, $http) {
    $scope.drawer = function () {
        $http.get("https://cse5335-axb3015.herokuapp.com/graphdata")
            .success(function (response) {
                $scope.resp = response;
                console.log($scope.resp);
                google.charts.load('current', {'packages': ['corechart']});

                function drawChart(resp) {
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'Topping');
                    data.addColumn('number', 'Slices');
                    console.log(resp);
                    for (r in resp) {
                        data.addRow([resp[r].label, resp[r].count]);
                    }
                    var options = {
                        'title': 'How Much Pizza I Ate Last Night',
                        'width': 500,
                        'height': 300
                    };
                    var chart = new google.visualization.ColumnChart(document.getElementById('div2'));
                    chart.draw(data, options);
                }
                google.charts.setOnLoadCallback(drawChart($scope.resp));
            });
    }
});


/*
 function loadgraph() {
 alert('called load');
 google.charts.load('current', {'packages': ['corechart']});
 google.charts.setOnLoadCallback(drawChart);
 response = null;
 $.get("https://cse5335-axb3015.herokuapp.com/graphdata", function (data, status) {
 alert("Data: " + data + "\nStatus: " + status);
 response = data;

 });
 function drawChart() {
 var data = new google.visualization.DataTable();
 data.addColumn('string', 'Topping');
 data.addColumn('number', 'Slices');
 console.log(response)
 for (r in response) {
 data.addRow([response[r].label, response[r].count]);
 }
 var options = {
 'title': 'How Much Pizza I Ate Last Night',
 'width': 500,
 'height': 300
 };
 var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
 chart.draw(data, options);
 }
 }*/