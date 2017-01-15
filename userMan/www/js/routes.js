
app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('users-index', {
    cache: false,
    url: '/users',
    templateUrl: 'templates/users-index.html',
    controller: 'UsersIndexCtrl',
      data: {
          requireLogin: true
      }
  })

      .state('user-detail', {
          url: '/users/:userId',
          templateUrl: 'templates/user-detail.html',
          controller: 'UserDetailCtrl',
          data: {
              requireLogin: true
          }
      })

    .state('add', {
        url: '/add',
        templateUrl: 'templates/add-user.html',
        controller: 'AddController',
        data: {
            requireLogin: true
        }
    })

    .state('edit', {
        url: '/edit/:userId',
        templateUrl: 'templates/edit-user.html',
        controller: 'EditController',
        data: {
            requireLogin: true
        }
    })

  .state('login', {
      cache:false,
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
      data: {
          requireLogin: false
      }
  })

  .state('register', {
      cache:false,
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl',
      data: {
          requireLogin: false
      }
  })

$urlRouterProvider.otherwise('/login')
});