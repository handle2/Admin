/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    
    interface IProdcateg{
            id : number,
            name : string,
            url : string,
            inputs: Array<Object>
        }
        interface IChild{
            seq : number,
            name : string,
            url : string
        }
        interface IInput{
            id: number,
            type: string,
            url: string,
            name: string,
            children: Array<IChild>,
            length: number
        }

        interface IProdcategController{
            save(back?:boolean):void;
            initProdcateg():void;
            addInput():void;
            removeInput(id:number):void;
            addItem(input:IInput):void;
            toggleExtInput(input:IInput):void;
            checkActiveInput(id:number):boolean;
        }
    
        class ProdcategController implements IProdcategController{
            public error:string;
            public _formData : IProdcateg = {
                id : null,
                name : null,
                url : null,
                inputs: []
            };

        public inputs : Array<IInput> = [];
        public exsInputs : Array<IInput>;


        constructor(private scope, private http, private window , private localStorageService,private prodcategService, private prodcateg,private prodcategs,private extInputs) {
            this.exsInputs = extInputs;
            if(prodcateg){
                this._formData = JSON.parse(prodcateg);
            }
            
            if((!prodcategService.prodcategs || prodcategService.prodcategs.length == 0) && prodcategs){
                prodcategService.prodcategs = JSON.parse(prodcategs);
            }
            this.initInputs(extInputs);
        }

        private initInputs(extInputs){
            for(var i = 0; i < this._formData.inputs.length; i++){
                for(var j = 0; j < extInputs.length; j++) {
                    if(extInputs[j].id == this._formData.inputs[i]){
                        this.inputs.push(extInputs[j]);
                    }
                }
            }
        }
        public initProdcateg(){
            var self = this;

            self.http.get('/admin/prodcateg/list').then(function successCallback(response) {
                self.prodcategService.prodcategs = JSON.parse(response.data);
            }, function errorCallback(response) {
                self.error = response.data;
            });
        }
            
        public addInput(){
            var actId = this.inputs.length > 0? this.inputs[this.inputs.length - 1].id+1:1;
            var input = {
                id: actId,
                type: null,
                url: null,
                name: null,
                children: [],
                length: null
            };
            this.inputs.push(input);
        }

        public removeInput(id:number){

            for(var i = 0;i<this.inputs.length;i++){
                if(this.inputs[i].id == id){
                    this.inputs.splice(i,1);
                }
            }
            for(var i = 0;i<this._formData.inputs.length;i++){
                if(this._formData.inputs[i] == id){
                    this._formData.inputs.splice(i,1);
                }
            }

        }

        public addItem(input:IInput){
            var seq = input.children.length>0?input.children[input.children.length-1].seq+1:1;
            var item = {
                seq : seq,
                name : null,
                url : null
            };
            if(!input.url){
                input.children.push(item);
            }
        }
            
        public toggleExtInput(input){
            var index = this._formData.inputs.indexOf(input.id);
            if(index>-1){
                this._formData.inputs.splice(index,1);
                for(var i = 0;i<this.inputs.length;i++){
                    if(this.inputs[i].id == input.id){
                        this.inputs.splice(i,1);
                    }
                }
            }else{
                this._formData.inputs.push(input.id);
                this.inputs.push(input);
            }
        }

        public checkActiveInput(id){
            if(this._formData.inputs.indexOf(id) === -1){
                return true;
            }else{
                return false;
            }

        }
        public save(back?:boolean){
            var self = this;
            var notInputs = [];
            for(var i = 0;i<this.inputs.length;i++){
                if(!this.inputs[i].url){
                    notInputs.push(this.inputs[i]);
                }
            }
            var all = {
                data : this._formData,
                inputs: notInputs
            };
            var data = angular.toJson(all);
            self.http.post('/admin/prodcateg/save', data).then(function successCallback(response) {

                self._formData.inputs.concat(response.data[1]);
                if(back){
                    self.window.open('/admin/prodcateg', '_self');
                }else{
                    self.window.open('/admin/prodcateg/edit/'+response.data[0], '_self');
                }

            }, function errorCallback(response) {
                self.error = response.data;
            });
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('ProdcategController', ['$scope', '$http', '$window','localStorageService','ProdcategService','prodcateg','prodcategs','extInputs', ProdcategController]);
}