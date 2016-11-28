/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    interface IRight{
        id : number;
        name: string;
        code: string;
        type: string;
        parent: string;
    }

    interface IRightController{
        error : string;
        subRights: any;
        success: any;

        initRights(type:string) :void;
        save():void;
        addRight():void;
        saveSubs(parentCode:string):void;
        removeSub(sub:any):void;
    }

    class RightController implements IRightController{
        public error:string;
        public _formData:IRight;
        public subRights = [];
        
        public success =[];

        constructor(private scope, private location, private http, private window ,public commonService, private localStorageService,private rightService,private rightInit) {
            if(!rightService.rights){
                this.initRights("group");
            }
            if(rightInit){
                var self = this;
                this._formData = JSON.parse(rightInit);
                this.http.get('/admin/right/getSub/'+this._formData.code).then(function successCallback(response) {
                    self.subRights = JSON.parse(response.data);
                });
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

        public addRight(){
            this.subRights.push({id:null,code:null,type:null,name:null});
        }

        public saveSubs(parentCode){
            var self = this;
            var newRights = [];
            this.success = [];
            for (var i = 0;i<this.subRights.length;i++) {
                this.subRights[i].type = 'subRight';
                this.subRights[i].parent = parentCode;
                if(this.subRights[i].code.indexOf(parentCode)===-1){
                    this.subRights[i].code = parentCode+'.'+this.subRights[i].code;
                }
                var data = JSON.stringify(this.subRights[i]);
                this.http.post('/admin/right/save',data).then(function (response) {
                    var res = JSON.parse(response.data);
                    newRights.push(res);
                    self.success.push("Sikeres jogosultság mentés:"+res.code);
                });
            }

            this.subRights = newRights;
        }

        public removeSub(sub){
            console.log(sub.$$hashKey,this.subRights);
            if(sub.id){
                this.http.post('/admin/right/delete',sub.id);
            }
            for( var i = 0;i<this.subRights.length;i++){
                if(sub.$$hashKey == this.subRights[i].$$hashKey){
                    this.subRights.splice(i, 1);
                }
            }
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('RightController', ['$scope', '$location', '$http', '$window','CommonService','localStorageService','RightService','rightInit', RightController]);
}