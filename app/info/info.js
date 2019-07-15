'use strict';

angular.module('myApp.info', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/info', {
    controller: 'InfoCtrl'
  });
}])

.controller('InfoCtrl', function($scope, $mdDialog, $mdToast, infoFactory) {

    // read list
    $scope.readList = function(){

        // use factory
        infoFactory.readList().then(function successCallback(response){
            $scope.list = response.data;
        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });

    };

    // show 'create form' in dialog box
    $scope.showCreateForm = function(event){

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'info/template/create.template.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
    };

    // create new product
    $scope.create = function(){

        infoFactory.create($scope).then(function successCallback(response){

            // tell the user new record was created
            $scope.showToast('Successful record creation');

            // refresh the list
            $scope.readList();

            // close dialog
            $scope.cancel();

            // remove form values
            $scope.clearForm();

        }, function errorCallback(response){
            $scope.showToast("Unable to create record.");
        });
    };

    // clear variable / form values
    $scope.clearForm = function(){
        $scope.id = "";
        $scope.name = "";
        $scope.email = "";
        $scope.description = "";
    };

    // show toast message
    $scope.showToast = function(message){
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .hideDelay(3000)
                .position("top right")
        );
    };

    // methods for dialog box
    function DialogController($scope, $mdDialog) {
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }

    // retrieve record to fill out the form
    $scope.readOne = function(id){

        // get record data to be edited
        infoFactory.readOne(id).then(function successCallback(response){

            var data = {
                name: '',
                email: '',
                description: ''
            };
            if(response.data.length > 0) {
                data = response.data[0];
            }

            // put the values in form
            $scope.id = id;
            $scope.name = data.name;
            $scope.email = data.email;
            $scope.description = data.description;

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'info/template/read_one.template.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            }).then(
                function(){},

                // user clicked 'Cancel'
                function() {
                    // clear modal content
                    $scope.clearForm();
                }
            );

        }, function errorCallback(response){
            $scope.showToast("Unable to retrieve record.");
        });

    };

    // retrieve record to fill out the form
    $scope.showUpdateForm = function(id){

        // get record data to be edited
        infoFactory.readOne(id).then(function successCallback(response){

            var data = {
                name: '',
                description: '',
                email: ''
            };
            if(response.data.length > 0) {
                data = response.data[0];
            }

            // put the values in form
            $scope.id = id;
            $scope.name = data.name;
            $scope.email = data.email;
            $scope.description = data.description;

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'info/template/update.template.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            }).then(
                function(){},

                // user clicked 'Cancel'
                function() {
                    // clear modal content
                    $scope.clearForm();
                }
            );

        }, function errorCallback(response){
            $scope.showToast("Unable to retrieve record.");
        });

    };

    // update record / save changes
    $scope.update = function(){

        infoFactory.update($scope).then(function successCallback(response){

                // tell the user record was updated
                $scope.showToast('Successful record update');

                // refresh the product list
                $scope.readList();

                // close dialog
                $scope.cancel();

                // clear modal content
                $scope.clearForm();

            },
            function errorCallback(response) {
                $scope.showToast("Unable to update record.");
            });

    };

    // confirm record deletion
    $scope.confirmDelete = function(event, id){

        // set id of record to delete
        $scope.id = id;

        // dialog settings
        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent('Record will be deleted.')
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');

        // show dialog
        $mdDialog.show(confirm).then(
            // 'Yes' button
            function() {
                // if user clicked 'Yes', delete record
                $scope.delete();
            },

            // 'No' button
            function() {
                // hide dialog
            }
        );
    };

    // delete record
    $scope.delete = function(){

        infoFactory.delete($scope.id).then(function successCallback(response){

            // tell the user product was deleted
            $scope.showToast('Successful record deletion');

            // refresh the list
            $scope.readList();

        }, function errorCallback(response){
            $scope.showToast("Unable to delete record.");
        });

    };
})

.factory("infoFactory", function($http){

    var factory = {};

    // read all list
    factory.readList = function(){
        return $http({
            method: 'GET',
            url: apiLink + '/api/infos'
        });
    };

    // create
    factory.create = function($scope){
        return $http({
            method: 'POST',
            data: {
                'name' : $scope.name,
                'email' : $scope.email,
                'description' : $scope.description
            },
            url: apiLink + '/api/infos'
        });
    };

    // read one
    factory.readOne = function(id){
        return $http({
            method: 'GET',
            url: apiLink + '/api/infos/' + id
        });
    };

    // update
    factory.update = function($scope){

        return $http({
            method: 'PUT',
            data: {
                'id' : $scope.id,
                'name' : $scope.name,
                'email' : $scope.email,
                'description' : $scope.description
            },
            url: apiLink + '/api/infos/' + $scope.id
        });
    };

    // delete
    factory.delete = function(id){
        return $http({
            method: 'DELETE',
            url: apiLink + '/api/infos/' + id
        });
    };


    return factory;
});