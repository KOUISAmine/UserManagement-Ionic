
app.factory('loginService',function($http, $location, $ionicPopup, sessionService){
    return{
        login:function(data,scope){
            var $promise=$http.post('http://192.168.56.102/userMan/www/data/user.php',data);
            $promise.then(function(msg){
                var uid=msg.data;
				console.info(JSON.stringify(uid), null, 4);
                if(uid){
					console.info(JSON.stringify('Entree'), null, 4);
                    sessionService.set('uid',uid);
                    $location.path('/users');
                }
                else  {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Échec de la connexion!',
                        template: 'Veuillez vérifier vos informations d\'identification!'
                    });
                         $location.path('/login');
                }
            });
        },
        logout:function(){
            sessionService.destroy('uid');
            $location.path('/login');
        },
        islogged:function(){
			 if(sessionService.get('uid')) return true;
			 else return false;
        }
    }
});

app.factory('sessionService', ['$http', function($http){
    return{
        set:function(key,value){
            return sessionStorage.setItem(key,value);
        },
        get:function(key){
            return sessionStorage.getItem(key);
        },
        destroy:function(key){
            $http.post('http://192.168.56.102/userMan/www/data/destroy_session.php');
            return sessionStorage.removeItem(key);
        }
    };
}]);


app.factory('registerService', ['$http', '$location', function ($http , $location) {
        return {
            addUser: function (data, scope) {
                var $promise = $http.post('http://192.168.56.102/userMan/www/data/register.php', data); //send data to register.php
                $promise.then(function (msg) {
                    var uid = msg.data;
                    if (uid) {
                        $location.path('/login');
                    }
                    else {
                        scope.msgtxt = 'incorrect information';
                        $location.path('/login');
                    }
                });
            }
        }
}]);


app.factory('addService', ['$http', '$location', function ($http , $location) {
    return {
        saveUser: function (data, scope) {
            var $promise = $http.post('http://192.168.56.102/userMan/www/data/register.php', data); //send data to register.php
            $promise.then(function (msg) {
                var uid = msg.data;
                if (uid) {
                    scope.username='';
                    scope.useremail='';
                    scope.userpassword='';
                    scope.phone='';
                    scope.address='';
                    $location.path('/users');
                }
                else {
                     $location.path('/users');
                }
            });
        }
    }
}]);


app.factory('userService', function($http, $location) {
    var users = [];

    return {
        getUsers: function(){
            return $http.get("http://192.168.56.102/userMan/www/data/showUsers.php").then(function(response){
                users = response.data.records;
                return users;
            });
        },

        getUser: function(id){
            for(i=0;i<users.length;i++){
                if(users[i].uid == id){
                    return users[i];
                }
            }
            return null;
        },

        updateUser: function(user) {
            var $promise = $http.post('http://192.168.56.102/userMan/www/data/updateUser.php', user); //send data to register.php
            $promise.then(function (msg) {
                var uid = msg.data;
                if (uid) {
                    $location.path('/users');
                }
                else {
                    scope.msgtxt = 'incorrect information';
                    $location.path('/users');
                }
            });
        },

        deleteUser: function(id) {
            $http({
                method: 'POST',
                url:  'http://192.168.56.102/userMan/www/data/deleteUser.php',
                data: { uid : id }
            }).then(function (response) {
                $location.path('/users');
            }, function (response) {
                console.log(response.data,response.status);
            });
        },

        indexOf: function(id) {
        for(var i = 0; i < users.length; i++) {
            if (users[i].uid === id) {
                return i;
            }
        }
        return -1;
    }
    }
})