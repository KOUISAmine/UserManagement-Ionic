

app.controller('loginCtrl', ['$scope','loginService', function ($scope, loginService) {
    $scope.login=function(data){
		console.info(JSON.stringify(data), null, 4);
        loginService.login(data,$scope);
    };
}]);

app.controller('registerCtrl', ['$scope','registerService', function ($scope, registerService) {
    $scope.msgtxt='';

    $scope.addUser=function(data){
        registerService.addUser(data,$scope);
    };
}]);


app.controller('UsersIndexCtrl', function ($scope, $state, userService, loginService) {

    $scope.logout=function(){
        loginService.logout();
    }

    $scope.add = function() {
        $state.go('add');
    };

    $scope.delete = function(userId) {
        userService.getUsers().then(function(data){
            $scope.users = data;
            var index = userService.indexOf(userId);
            $scope.users.splice(index, 1);
            $state.go($state.current, {}, {reload: true});
        });
        userService.deleteUser(userId);
        $state.go($state.current, {}, {reload: true});
    }
    function getUser(){
        userService.getUsers().then(function(data){$scope.users = data;});
    }

    getUser();
    $scope.doRefresh = function() {
        userService.getUsers().then(function(data){$scope.users = data;});
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply()
    }
});

app.controller('UserDetailCtrl', function ($scope, $stateParams, userService, loginService) {
    $scope.logout=function(){
        loginService.logout();
    }
    userService.getUsers().then(function(){
        $scope.user = angular.copy(userService.getUser($stateParams.userId));
        console.info(JSON.stringify($scope.user, null, 4));
    });
});

app.controller('AddController', function ($scope, addService, loginService) {
    $scope.logout=function(){
        loginService.logout();
    }
    $scope.msgtxt='';
    $scope.saveUser=function(data){
        addService.saveUser(data,$scope);
    };
});

app.controller('EditController', function($scope, $state, loginService, userService) {
    $scope.logout=function(){
        loginService.logout();
    }
    userService.getUsers().then(function(){
        $scope.user = angular.copy(userService.getUser($state.params.userId));
    });

    $scope.save = function() {
        userService.updateUser($scope.user);
    };

    $scope.delete = function() {
        userService.deleteUser($scope.user.uid);
    };
});