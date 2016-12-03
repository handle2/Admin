/// <reference path="./../typings/tsd.d.ts" />
module backApp{
    var backApp = angular.module('backApp',["ngRoute","LocalStorageModule","smart-table","ui.bootstrap"]);
    
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
            .when("/admin/role", {
                templateUrl : '/modules/Admin/views/directives/role/role-index.html',
                controller : 'RoleController',
                controllerAs: 'ctrl',
                resolve:	{
                    roleInit:	[function () {
                        return false;
                    }],
                    rights:	[function () {
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
                        var role = http.get('/admin/role/get/'+route.current.params.id).then(function successCallback(response) {
                            return response.data;
                        });
                        return role;
                    }],
                    rights:	["$route","$http", function(route,http) {
                        var rights = http.get('/admin/right/list').then(function successCallback(response) {
                            return JSON.parse(response.data);
                        });
                        
                        return rights;
                    }]
                }
            })
            .when("/admin/right", {
                templateUrl : '/modules/Admin/views/directives/right/right-index.html',
                controller : 'RightController',
                controllerAs: 'ctrl',
                resolve:	{
                    rightInit:	[function () {
                        return false;
                    }]
                }
            })
            .when("/admin/right/edit/:id?", {
                templateUrl : '/modules/Admin/views/directives/right/right-edit.html',
                controller : 'RightController',
                controllerAs: 'ctrl',
                resolve:	{
                    rightInit:	["$route","$http", function(route,http) {
                        var right = http.get('/admin/right/get/'+route.current.params.id).then(function successCallback(response) {
                            return response.data;
                        });
                        return right;
                    }]
                }
            })
            .when("/admin/content", {
                templateUrl : '/modules/Admin/views/directives/content/content-index.html',
                controller : 'ContentController',
                controllerAs: 'ctrl'
            });
    });
}