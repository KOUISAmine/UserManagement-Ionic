var app = angular.module('app', ['ionic', 'ngCordova'])

app.run(function($ionicPlatform, $rootScope, $state, loginService) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            console.info('Authentication...');
            var requireLogin = toState.data.requireLogin;
            if (requireLogin  && !loginService.islogged()){
                $state.go("login");
                event.preventDefault();
            }
        });

    });
});