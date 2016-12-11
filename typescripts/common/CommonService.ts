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
        role : any;
    }
    interface ICommonService{
        getLoggedUser():void;
        hasPermission(code:string):boolean;
    }
    export class CommonService implements ICommonService{
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
            var username = this.localStorageService.get('username');
            return this.http.get('/admin/profile/getUser/'+username);
        }

        public hasPermission(code){
            if(this.user && !this.user['$$state']){
                if(this.user.role.rights.indexOf(code)>-1){
                    return true;
                }else{
                    return false;
                }
            }
            return false;

        }
    }

    var backApp = angular.module('backApp');


   backApp.service('CommonService', ['$rootScope','$location','$window','$http','localStorageService', function(rootScope,location,window,http,localStorageService){
        return new CommonService(rootScope,location,window,http,localStorageService);
    }]);
}
