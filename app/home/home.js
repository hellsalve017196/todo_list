angular.module('myApp.home', ['ngRoute','firebase'])

// Declared route 
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });

        localStorage.setItem("url","http://nakamuka.firebaseio.com/");
    }])

// Home controller
    .controller('HomeCtrl', ['$scope','$firebase',function($scope,$firebase) {
        var firebaseObj = new Firebase(localStorage.getItem("url"));

        $scope.updated_list = function() {
            obj = $firebase(firebaseObj.child('tasks')).$asObject();

            obj.$bindTo($scope,"todo_list");
        }

        $scope.add_item = function() {
            todo_name = $scope.to_do_name;

            var timestamp = new Date().valueOf();
            firebaseObj = new Firebase(localStorage.getItem("url") + "tasks/" + timestamp);

            $firebase(firebaseObj).$set({
                id : timestamp,
                name : todo_name,
                done : false
            });

            $scope.to_do_name = "";
        }

        $scope.delete_item = function(todo) {

            delete $scope.todo_list[todo.id];

        }

        $scope.edit_item = function(todo) {
            temp = $scope.todo_list;
            delete temp[todo.id];
            temp[todo.id] = { 'name' : todo.name , 'id' : todo.id,'done' : true};

            $scope.todo_list = temp;
        }

        $scope.updated_list();

    }]);