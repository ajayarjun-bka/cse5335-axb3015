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
                console.log($scope.resp);
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

app.controller('maps', function ($scope, $http) {
    $scope.mapper = function () {
        $http.get("https://cse5335-axb3015.herokuapp.com/graphdata")
            .success(function (response) {
                $scope.resp = response;
            });
        function initMap() {
            var home = {lat: 32.733487, lng: -97.120123};
            var kfc = {lat: 32.735095, lng: -97.114823};
            var mcd = {lat: 32.735966, long: -97.113788};
            var map = new google.maps.Map(document.getElementById('div3'), {
                zoom: 15,
                center: home
            });
            var marker = new google.maps.Marker({
                position: home,
                map: map
            });
            var marker1 = new google.maps.Marker({
                position: kfc,
                map: map
            });
            var marker2 = new google.maps.Marker({
                position: mcd,
                map: map
            });

        }

        initMap();

    }

});