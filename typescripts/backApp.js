/// <reference path="./../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var backApp = angular.module('backApp', ["ngRoute", "LocalStorageModule"]);
    backApp.config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('backApp');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider.when("/admin", {
            templateUrl: '/modules/Admin/views/directives/index/index.html'
        })
            .when("/admin/right", {
            templateUrl: '/modules/Admin/views/directives/right/right-index.html',
            controller: 'RightController',
            controllerAs: 'ctrl'
        })
            .when("/admin/right/upload", {
            templateUrl: '/modules/Admin/views/directives/right/right-upload.html',
            controller: 'RightController',
            controllerAs: 'ctrl'
        })
            .when("/admin/content", {
            templateUrl: '/modules/Admin/views/directives/content/content-index.html',
            controller: 'ContentController',
            controllerAs: 'ctrl'
        });
    });
})(backApp || (backApp = {}));
//# sourceMappingURL=backApp.js.map