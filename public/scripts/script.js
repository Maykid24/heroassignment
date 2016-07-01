var myApp=angular.module('myApp', []);

myApp.controller('whereTheHeroes', ['$scope', '$http', function ($scope, $http) {
  $scope.data = {
    model: null,
    availableOptions: [
      {id: '1', name: 'Invisibility'},
      {id: '2', name: 'Flight'},
      {id: '3', name: 'Super Speed'},
      {id: '4', name: 'Heat Vision'},
      {id: '5', name: 'Super Strength'},
      {id: '6', name: 'Power Blast'},
      {id: '7', name: 'Animal Affinity'}
    ]
  };

  $scope.addHero = function () {
    event.preventDefault();

    var objectToSend = {
      alias : $scope.aliasIn,
      first_name : $scope.firstIn,
      last_name : $scope.lastIn,
      city : $scope.cityIn,
      power_name : $scope.data.model
    }; //End of object to send
    $http({
      method: 'POST',
      url: '/heroPost',
      data: objectToSend
    });//End of http
    console.log(objectToSend);
    $scope.aliasIn = '';
    $scope.firstIn = '';
    $scope.lastIn = '';
    $scope.cityIn = '';
    $scope.data.model = '';
  };//End of add hero function

  $scope.getHeroes = function (){
    $http({
      method: 'GET',
      url: '/getHeroes',
    }). then(function (response) {
      $scope.allTheHeroes = response.data;
      console.log($scope.allTheHeroes);
    });
  };//end of get heroes function

  $scope.deleteHero = function (hero) {
    $http({
      method: 'DELETE',
      url: '/deleteHeroes',
    }). then(function (hero) {
      var index = $scope.allTheHeroes.indexOf(hero);
      $scope.allTheHeroes.splice(index,1);
    });
  };
}]);//End of my app controller whereTheHeroes
