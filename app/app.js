angular.module('myApp',['ngRoute','myApp.home'])

.config(['$routeProvider',function($routeProvider) {


      // default view :D
      $routeProvider.otherwise({
        redirectTo : '/home'
      })
    }])