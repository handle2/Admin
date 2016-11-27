/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IContentController{
    }

    class ContentController{


        constructor(private scope, private location, private http, private window ,public commonService) {
        }

        public getUsername(){
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('ContentController', ['$scope', '$location', '$http', '$window','CommonService', ContentController]);
}