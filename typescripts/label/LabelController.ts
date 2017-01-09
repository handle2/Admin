/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface ILabelController{
    }

    class LabelController implements ILabelController{
        public _formData : any = {};

        constructor(private scope,private http, private window,private labelService,private label,private labels){
            this.init();
        }

        public init(){
            if(this.label){
                this._formData = this.label;
            }
            if(!this.labelService.labels){
                this.labelService.labels = this.labels;
            }
        }

        public save(back:boolean):void{
            var self = this;
            var data = angular.toJson(this._formData);
            this.http.post('/admin/label/save',data).then(function (response) {
                var id = angular.fromJson(response.data);
                if(back){
                    self.window.open('/admin/label', '_self');
                }else{
                    self.window.open('/admin/label/edit/'+id, '_self');
                }
            },function (response) {

            });
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('LabelController', ['$scope', '$http','$window','LabelService','label','labels', LabelController]);
}