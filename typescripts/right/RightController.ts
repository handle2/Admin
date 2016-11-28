/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IRight{
        id : number;
        code: string;
        type: string;
    }
    class RightController{
        public error:string;
        public _formData:IRight;
        constructor(private scope, private location, private http, private window ,public commonService, private localStorageService,private rightService,private rightInit) {
            if(!rightService.rights){
                this.initRights("group");
            }
            if(rightInit){
                this._formData = JSON.parse(rightInit);
            }
        }

        public initRights(type:string){
            var self = this;
            
            self.http.get('/admin/right/list/'+type).then(function successCallback(response) {
                self.rightService.rights = JSON.parse(response.data);
            }, function errorCallback(response) {
                self.error = response.data;
            });
        }

        public save(){
            var self = this;
            var data = JSON.stringify(this._formData);
            this.http.post('/admin/right/save',data).then(function (response) {
                var newRight = JSON.parse(response.data);
                if(!self._formData.id){
                    self.rightService.rights.push(newRight);
                }else{
                    for(var i = 0;i<self.rightService.rights.length;i++){
                        if(newRight.id == self.rightService.rights[i].id){
                            self.rightService.rights.splice(i, 1);
                            self.rightService.rights.push(newRight);
                        }
                    }
                }
                self.location.path('/admin/right')
            });
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('RightController', ['$scope', '$location', '$http', '$window','CommonService','localStorageService','RightService','rightInit', RightController]);
}