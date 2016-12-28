/// <reference path="./../typings/tsd.d.ts" />
module backApp{
    var backApp = angular.module('backApp',["ngRoute","LocalStorageModule","smart-table","ui.bootstrap","uiSwitch"]);
    
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
                        var id = route.current.params.id!=undefined?route.current.params.id:false;
                        var role = http.get('/admin/role/get/'+id).then(function successCallback(response) {

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
            .when("/admin/prodcateg", {
                templateUrl : '/modules/Admin/views/directives/prodcateg/prodcateg-index.html',
                controller : 'ProdcategController',
                controllerAs: 'ctrl',
                resolve:	{
                    prodcateg:	[function () {
                        return false;
                    }],
                    extInputs:	[function () {
                        return false;
                    }],
                    prodcategs:	["$route","$http", function(route,http) {
                        var prodcategs = http.get('/admin/prodcateg/list').then(function successCallback(response) {
                            return response.data;
                        });
                        return prodcategs;
                    }]
                }
            })
            .when("/admin/prodcateg/edit/:id?", {
                templateUrl : '/modules/Admin/views/directives/prodcateg/prodcateg-edit.html',
                controller : 'ProdcategController',
                controllerAs: 'ctrl',
                resolve:	{
                    prodcateg:	["$route","$http", function(route,http) {
                        var prodcateg = http.get('/admin/prodcateg/get/'+route.current.params.id).then(function successCallback(response) {
                            return response.data;
                        });
                        return prodcateg;
                    }],
                    extInputs:	["$route","$http", function (route,http) {
                        var inputs = http.get('/admin/prodcateg/getInputs').then(function successCallback(response) {
                            return response.data;
                        });
                        return inputs;
                    }],
                    prodcategs:	[function () {
                        return false;
                    }],
                }
            })
            .when("/admin/content", {
                templateUrl : '/modules/Admin/views/directives/content/content-index.html',
                controller : 'ContentController',
                controllerAs: 'ctrl'
            });
    });
}