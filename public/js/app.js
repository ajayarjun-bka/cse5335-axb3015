/**
 * Created by Ajay Arjun on 10/2/2016.
 */
var app = angular.module('myApp', []);
//google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(drawChart);

google.charts.load('current', {'packages': ['corechart']});
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
                function drawChart(resp) {
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'Topping');
                    data.addColumn('number', 'Slices');
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

app.controller('maps', function ($scope, $http) {
    $scope.mapper = function () {
        $http.get("https://cse5335-axb3015.herokuapp.com/graphdata")
            .success(function (response) {
                $scope.data = response;
                console.log($scope.data);
                function initMap(data) {
                    var home = {lat: 32.733487, lng: -97.120123};
                    var map = new google.maps.Map(document.getElementById('div3'), {
                        zoom: 15,
                        center: home
                    });
                    var marker
                    console.log(data);
                    // var data = [{lat:32.738647, lng: -97.107513},{lat: 32.733487, lng: -97.120123},
                    //     {lat: 32.735095, lng: -97.114823}];
                    for (i = 0; i < data.length; i++) {
                        console.log("for loop");
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(data[i].lat, data[i].lng),
                            map: map
                        })
                    }
                }

                initMap($scope.data)
            });

    }

});