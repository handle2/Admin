/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IContentController{
        toggleLabel(code:string):void;
        save(back:boolean):void;
    }

    class ContentController implements IContentController{

        public accordion = {
            main : false,
            pictures : true,
            text : true,
            labels: true
        };

        public frontLabels : Array<any> = [];

        public _formData : any = {

        };

        constructor(private scope, private location, private http, private window ,public contentService,public content, public contents, public labels) {
            if(content){
                this._formData = content;
                if(this._formData.labels){
                    for(var i = 0;i<this._formData.labels.length;i++){
                        this.frontLabels[this._formData.labels[i]] = true;
                    }
                }
            }
            if(contents && !contentService.contents){
                contentService.contents = contents;
            }
        }

        public toggleLabel(code:string){
            if(!this._formData.labels){
                this._formData.labels = [];
            }
            var index = this._formData.labels.indexOf(code);
            if(index > -1){
                this.frontLabels[code] = false;
                this._formData.labels.splice(index, 1);
            }else{
                this.frontLabels[code] = true;
                this._formData.labels.push(code);
            }
        }

        public save(back:boolean){
            var self = this;
            var data = angular.toJson(this._formData);
            this.http.post('/admin/content/save',data).then(function (response) {
                var id = angular.fromJson(response.data);
                if(back){
                    self.window.open('/admin/content', '_self');
                }else{
                    self.window.open('/admin/content/edit/'+id, '_self');
                }
            },function (response) {

            });
        }

    }

    var backApp = angular.module('backApp');
    backApp.controller('ContentController', ['$scope', '$location', '$http', '$window','ContentService','content','contents','labels', ContentController]);
}