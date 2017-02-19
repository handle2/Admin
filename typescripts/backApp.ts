/// <reference path="./../typings/tsd.d.ts" />
module backApp{


    var backApp = angular.module('backApp',["ngRoute","LocalStorageModule","smart-table","ui.bootstrap","uiSwitch","angular-img-cropper","pascalprecht.translate","angular-loading-bar","jkuri.datepicker","angularModalService"]); //,"ngImgCrop"

    backApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);


    /**
     * beállítunk alap headert a requestekhez
     */
    backApp.config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';
        $httpProvider.defaults.headers.common['Access-Control-Max-Age'] = '1728000';
        $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.useXDomain = true;

    }]);



    backApp.config(function ($routeProvider,$locationProvider,localStorageServiceProvider,$translateProvider,$httpProvider) {


        $translateProvider.useSanitizeValueStrategy('escapeParameters');

        $translateProvider.useStaticFilesLoader({
            prefix: '/modules/Admin/lang/',
            suffix: '.json'
        });

        /**
         * locale storage beállítása
         */
        localStorageServiceProvider
            .setPrefix('backApp');
        
        /**
         * angularos # kikapcsolása urlből
         */
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        /**
         * request headerben betesszük a locale storageban tárolt auth tokent
         */
        $httpProvider.interceptors.push(['localStorageService',function (localStorageService) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if (localStorageService.get('hash')) {
                        config.headers.XAuth = localStorageService.get('hash')?localStorageService.get('hash'):'not_auth';
                    }
                    if (localStorageService.get('lang')) {
                        config.headers.XLang = localStorageService.get('lang');
                    }
                    return config;
                }
            }
        }]);

        /**
         * routing
         */
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
        .when("/admin/language", {
            templateUrl : '/modules/Admin/views/directives/routes/language/language-index.html',
            controller : 'LanguageController',
            controllerAs: 'ctrl',
            resolve:	{
                language:	[function () {
                    return false;
                }],
                languages:	["$route","$http", function(route,http) {
                    return http.get('/admin/language/list').then(function successCallback(response) {
                        return angular.fromJson(response.data);
                    });
                }]
            }
        })
        .when("/admin/language/edit/:id?", {
            templateUrl : '/modules/Admin/views/directives/routes/language/language-edit.html',
            controller : 'LanguageController',
            controllerAs: 'ctrl',
            resolve:	{
                language:	["$route","$http", function(route,http) {
                    return http.get('/admin/language/get/'+route.current.params.id).then(function successCallback(response) {
                        return angular.fromJson(response.data);
                    });
                }],
                languages:	[function () {
                    return false;
                }],
            }
        })
        .when("/admin/storage", {
            templateUrl : '/modules/Admin/views/directives/routes/storage/storage-index.html',
            controller : 'StorageController',
            controllerAs: 'ctrl',
            resolve:	{
                storage:	[function () {
                    return false;
                }],
                storages:	["$route","$http", function(route,http) {
                    return http.get('/admin/storage/list').then(function successCallback(response) {
                        return angular.fromJson(response.data);
                    });
                }],
                products:	[function () {
                    return false;
                }],
            }
        })
        .when("/admin/storage/edit/:id?", {
            templateUrl : '/modules/Admin/views/directives/routes/storage/storage-edit.html',
            controller : 'StorageController',
            controllerAs: 'ctrl',
            resolve:	{
                storage:	["$route","$http", function(route,http) {
                    return http.get('/admin/storage/get/'+route.current.params.id).then(function successCallback(response) {
                        return angular.fromJson(response.data);
                    });
                }],
                storages:	[function () {
                    return false;
                }],
                products:	["$route","$http", function(route,http) {
                    return http.get('/admin/product/list').then(function successCallback(response) {
                        return angular.fromJson(response.data);
                    });
                }],
            }
        })
        .when("/admin/partner", {
            templateUrl : '/modules/Admin/views/directives/routes/partner/partner-index.html',
            controller : 'PartnerController',
            controllerAs: 'ctrl',
            resolve:	{
                partner:	[function () {
                    return false;
                }],
                partners:	["$route","$http", function(route,http) {
                    return http.get('/admin/partner/list').then(function successCallback(response) {
                        return angular.fromJson(response.data);
                    });
                }],
                roles:	[function () {
                    return false;
                }],
            }
        })
        .when("/admin/partner/edit/:id?", {
            templateUrl : '/modules/Admin/views/directives/routes/partner/partner-edit.html',
            controller : 'PartnerController',
            controllerAs: 'ctrl',
            resolve:	{
                partner:	["$route","$http", function(route,http) {
                    return http.get('/admin/partner/get/'+route.current.params.id).then(function successCallback(response) {
                        return angular.fromJson(response.data);
                    });
                }],
                partners:	[function () {
                    return false;
                }],
                roles:	["$route","$http", function(route,http) {
                    return http.get('/admin/role/list').then(function successCallback(response) {
                        return angular.fromJson(response.data);
                    });
                }],
            }
        })
        .when("/admin/master", {
            templateUrl : '/modules/Admin/views/directives/routes/master/master-index.html',
            controller : 'MasterController',
            controllerAs: 'ctrl'
        })
    });

}