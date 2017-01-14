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
                this.reloadUserData();
            }
        }


        public getLoggedUser(){
            var username = this.localStorageService.get('username');
            return this.http.get('/admin/profile/getUser/'+username);
        }

        public reloadUserData(){
            var self = this;
            this.getLoggedUser().then(function (response) {
                self.user = JSON.parse(response.data);
            });
        }

        public hasPermission(code){
            if(this.user && !this.user['$$state']){
                return this.user.role.rights.indexOf(code)>-1?true:false;
            }
            return false;

        }
    }

    var backApp = angular.module('backApp');


   backApp.service('CommonService', ['$rootScope','$location','$window','$http','localStorageService', function(rootScope,location,window,http,localStorageService){
        return new CommonService(rootScope,location,window,http,localStorageService);
    }]);
}
