/// <reference path="./../../typings/tsd.d.ts" />

module backApp{
    import IHttpPromise = angular.IHttpPromise;
    interface IUser{
        username:string;
        email: string;
        group: number;
        id:number;
        level : number;
        password: string;
    }

    export class CommonService{
        public user : IUser;
        public static instance : CommonService;
        constructor(private rootScope,private location,private window,private http,private localStorageService){
            if(!this.user){
                var self = this;
                this.user = this.getLoggedUser().then(function (response) {
                    self.user = JSON.parse(response.data);
                });
            }
        }


        public getLoggedUser(){
            var username = JSON.stringify(this.localStorageService.get('username'));
            return this.http.post('/admin/profile/getUser', username);
        }
    }

    var backApp = angular.module('backApp');


   backApp.service('CommonService', ['$rootScope','$location','$window','$http','localStorageService', function(rootScope,location,window,http,localStorageService){
        return new CommonService(rootScope,location,window,http,localStorageService);
    }]);
}
