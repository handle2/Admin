/// <reference path="./../typings/tsd.d.ts" />
module backApp{
    
    var backApp = angular.module('backApp',["ngRoute","LocalStorageModule","smart-table","ui.bootstrap","uiSwitch","angular-img-cropper","pascalprecht.translate"]); //,"ngImgCrop"
    
    backApp.config(function ($routeProvider,$locationProvider,localStorageServiceProvider,$translateProvider) {


        $translateProvider.useSanitizeValueStrategy('escapeParameters');

        $translateProvider.useStaticFilesLoader({
            prefix: '/modules/Admin/lang/',
            suffix: '.json'
        });

        // todo config itt kell beállítani a default nyelvet
        $translateProvider.preferredLanguage('hu');

        localStorageServiceProvider
            .setPrefix('backApp');


        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider.when("/admin", {
            templateUrl : '/modules/Admin/views/directives/routes/index/index.html'
        })
            .when("/admin/role", {
                templateUrl : '/modules/Admin/views/directives/routes/role/role-index.html',
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
                templateUrl : '/modules/Admin/views/directives/routes/role/role-edit.html',
                controller : 'RoleController',
                controllerAs: 'ctrl',
                resolve:	{
                    roleInit:	["$route","$http", function(route,http) {
                        var id = route.current.params.id!=undefined?route.current.params.id:false;
                        return http.get('/admin/role/get/'+id).then(function successCallback(response) {

                            return response.data;
                        });
                    }],
                    rights:	["$route","$http", function(route,http) {
                        return http.get('/admin/right/list').then(function successCallback(response) {
                            return JSON.parse(response.data);
                        });
                    }]
                }
            })
            .when("/admin/right", {
                templateUrl : '/modules/Admin/views/directives/routes/right/right-index.html',
                controller : 'RightController',
                controllerAs: 'ctrl',
                resolve:	{
                    rightInit:	[function () {
                        return false;
                    }]
                }
            })
            .when("/admin/right/edit/:id?", {
                templateUrl : '/modules/Admin/views/directives/routes/right/right-edit.html',
                controller : 'RightController',
                controllerAs: 'ctrl',
                resolve:	{
                    rightInit:	["$route","$http", function(route,http) {
                        return http.get('/admin/right/get/'+route.current.params.id).then(function successCallback(response) {
                            return response.data;
                        });
                    }]
                }
            })
            .when("/admin/prodcateg", {
                templateUrl : '/modules/Admin/views/directives/routes/prodcateg/prodcateg-index.html',
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
                        return http.get('/admin/prodcateg/list').then(function successCallback(response) {
                            return response.data;
                        });
                    }]
                }
            })
            .when("/admin/prodcateg/edit/:id?", {
                templateUrl : '/modules/Admin/views/directives/routes/prodcateg/prodcateg-edit.html',
                controller : 'ProdcategController',
                controllerAs: 'ctrl',
                resolve:	{
                    prodcateg:	["$route","$http", function(route,http) {
                        return http.get('/admin/prodcateg/get/'+route.current.params.id).then(function successCallback(response) {
                            return response.data;
                        });
                    }],
                    extInputs:	["$route","$http", function (route,http) {
                        return http.get('/admin/prodcateg/getInputs').then(function successCallback(response) {
                            return response.data;
                        });
                    }],
                    prodcategs:	[function () {
                        return false;
                    }],
                }
            })
            .when("/admin/product", {
                templateUrl : '/modules/Admin/views/directives/routes/product/product-index.html',
                controller : 'ProductController',
                controllerAs: 'ctrl',
                resolve:	{
                    product:	[function () {
                        return false;
                    }],
                    products:	["$route","$http", function(route,http) {
                        return http.get('/admin/product/list').then(function successCallback(response) {
                            return response.data;
                        });
                    }],
                    prodcategs:	[function () {
                        return false;
                    }],
                    discounts:	[function () {
                        return false;
                    }],
                }
            })
            .when("/admin/product/edit/:id?", {
                templateUrl : '/modules/Admin/views/directives/routes/product/product-edit.html',
                controller : 'ProductController',
                controllerAs: 'ctrl',
                resolve:	{
                    product:	["$route","$http", function(route,http) {
                        return http.get('/admin/product/get/'+route.current.params.id).then(function successCallback(response) {
                            return response.data;
                        });
                    }],
                    products:	[function () {
                        return false;
                    }],
                    prodcategs:	["$route","$http", function(route,http) {
                        return http.get('/admin/product/getProdcategs').then(function successCallback(response) {
                            return JSON.parse(response.data);
                        });
                    }],
                    discounts:	["$route","$http", function(route,http) {
                        return http.get('/admin/discount/list').then(function successCallback(response) {
                            return angular.fromJson(response.data);
                        });
                    }]
                }
            })
            .when("/admin/discount", {
                templateUrl : '/modules/Admin/views/directives/routes/discount/discount-index.html',
                controller : 'DiscountController',
                controllerAs: 'ctrl',
                resolve:	{
                    discount:	[function () {
                        return false;
                    }],
                    discounts:	["$route","$http", function(route,http) {
                        return http.get('/admin/discount/list').then(function successCallback(response) {
                            return response.data;
                        });
                    }]
                }
            })
            .when("/admin/discount/edit/:id?", {
                templateUrl : '/modules/Admin/views/directives/routes/discount/discount-edit.html',
                controller : 'DiscountController',
                controllerAs: 'ctrl',
                resolve:	{
                    discount:	["$route","$http", function(route,http) {
                        return http.get('/admin/discount/get/'+route.current.params.id).then(function successCallback(response) {
                            return response.data;
                        });
                    }],
                    discounts:	[function () {
                        return false;
                    }],
                }
            })
            .when("/admin/content", {
                templateUrl : '/modules/Admin/views/directives/routes/content/content-index.html',
                controller : 'ContentController',
                controllerAs: 'ctrl',
                resolve:	{
                    content:	[function () {
                        return false;
                    }],
                    contents:	["$route","$http", function(route,http) {
                        return http.get('/admin/content/list').then(function successCallback(response) {
                            return angular.fromJson(response.data);
                        });
                    }],
                    labels:	[function () {
                        return false;
                    }],
                }
            })
            .when("/admin/content/edit/:id?", {
                templateUrl : '/modules/Admin/views/directives/routes/content/content-edit.html',
                controller : 'ContentController',
                controllerAs: 'ctrl',
                resolve:	{
                    content:	["$route","$http", function(route,http) {
                        return http.get('/admin/content/get/'+route.current.params.id).then(function successCallback(response) {
                            return angular.fromJson(response.data);
                        });
                    }],
                    contents:	[function () {
                        return false;
                    }],
                    labels:	["$route","$http", function(route,http) {
                        return http.get('/admin/label/list').then(function successCallback(response) {
                            return angular.fromJson(response.data);
                        });
                    }]
                }
            })
            .when("/admin/label", {
                templateUrl : '/modules/Admin/views/directives/routes/label/label-index.html',
                controller : 'LabelController',
                controllerAs: 'ctrl',
                resolve:	{
                    label:	[function () {
                        return false;
                    }],
                    labels:	["$route","$http", function(route,http) {
                        return http.get('/admin/label/list').then(function successCallback(response) {
                            return angular.fromJson(response.data);
                        });
                    }]
                }
            })
            .when("/admin/label/edit/:id?", {
                templateUrl : '/modules/Admin/views/directives/routes/label/label-edit.html',
                controller : 'LabelController',
                controllerAs: 'ctrl',
                resolve:	{
                    label:	["$route","$http", function(route,http) {
                        return http.get('/admin/label/get/'+route.current.params.id).then(function successCallback(response) {
                            return angular.fromJson(response.data);
                        });
                    }],
                    labels:	[function () {
                        return false;
                    }],
                }
            })
    });
}