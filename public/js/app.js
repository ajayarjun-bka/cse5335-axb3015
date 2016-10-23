/**
 * Created by Ajay Arjun on 10/2/2016.
 */
var app = angular.module("MyApp", ["ngRoute"]);

google.charts.load("current", {"packages": ["corechart"]});


app.config(function ($routeProvider) {
    $routeProvider
        .when("/",{
            templateUrl: "public/partials/main.html"
        })
        .when("/table", {
            templateUrl: "public/partials/table.html",
            controller: "table"
        })
        .when("/graph", {
            templateUrl: "public/partials/graph.html",
            controller: "graph"
        })
        .when("/map", {
            templateUrl: "public/partials/map.html",
            controller: "map"
        })
        .otherwise({
            templateUrl: "public/partials/main.html"
        });

});

app.controller("table", function ($scope, $http) {
    $scope.maketable = function () {
        $http.get("https://cse5335-axb3015.herokuapp.com/json")
            .success(function (response) {
                $scope.mydata = response;
            })
            .error(function (response) {
                console.log("Error" + response.status);
            })
    }

});

app.controller("graph", function ($scope, $http) {
    $scope.drawer = function () {
        $http.get("https://cse5335-axb3015.herokuapp.com/graphdata")
            .success(function (response) {
                $scope.resp = response;
                function drawChart(resp) {
                    var data = new google.visualization.DataTable();
                    data.addColumn("string", "Manufacturer");
                    data.addColumn("number", "Number of Cars");
                    for (r in resp) {
                        data.addRow([resp[r].label, resp[r].count]);
                    }
                    var options = {
                        "title": "DATA FROM JSON",
                        "width": 600,
                        "height": 300
                    };
                    var chart = new google.visualization.ColumnChart(document.getElementById("div"));
                    chart.draw(data, options);
                }

                google.charts.setOnLoadCallback(drawChart($scope.resp));
            });
    }
});

app.controller("map", function ($scope, $http) {
    $scope.mapper = function () {
        $http.get("https://cse5335-axb3015.herokuapp.com/mapdata")
            .success(function (response) {
                $scope.data = response;
                console.log($scope.data);
                function initMap(data) {
                    var home = {lat: 32.733487, lng: -97.120123};
                    $("#map-div").css("height","480px");
                    var map = new google.maps.Map(document.getElementById("map-div"), {
                        zoom: 15,
                        center: home
                    });
                    var marker
                    console.log(data);
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

app.controller("header", function ($scope) {
    $scope.appDetails = {
        title: "PROJECT ONE",
        tagline: "CSE 5335 Web Data Management"
    };
});
