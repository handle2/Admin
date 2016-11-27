/// <reference path="./../typings/tsd.d.ts" />
module backApp{
    var backApp = angular.module('backApp',["ngRoute","LocalStorageModule"]);
    backApp.config(function ($routeProvider,$locationProvider,localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('backApp');


        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider.when("/admin", {
            templateUrl : '/modules/Admin/views/directives/index/index.html'
        })
        .when("/admin/right", {
            templateUrl : '/modules/Admin/views/directives/right/right-index.html',
            controller : 'RightController',
            controllerAs: 'ctrl'
        })
        .when("/admin/role", {
            templateUrl : '/modules/Admin/views/directives/role/role-index.html',
            controller : 'RoleController',
            controllerAs: 'ctrl',
            resolve:	{
                roleInit:	[function () {
                    return false;
                }]
            }
        })
        .when("/admin/role/edit/:id?", {
            templateUrl : '/modules/Admin/views/directives/role/role-edit.html',
            controller : 'RoleController',
            controllerAs: 'ctrl',
            resolve:	{
                roleInit:	["$route","$http", function(route,http) {
                    var role = http.get('/admin/role/getRole/'+route.current.params.id).then(function successCallback(response) {
                        return response.data;
                    });
                    return role;
                }]
            }
        })
        .when("/admin/right/upload", {
            templateUrl : '/modules/Admin/views/directives/right/right-upload.html',
            controller : 'RightController',
            controllerAs: 'ctrl'
        })
        .when("/admin/content", {
            templateUrl : '/modules/Admin/views/directives/content/content-index.html',
            controller : 'ContentController',
            controllerAs: 'ctrl'
        });
    });
}


