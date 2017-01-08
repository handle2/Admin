/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IContentController{
        save(back:boolean):void;
    }

    class ContentController implements IContentController{

        public accordion = {
            main : false,
            pictures : true,
            text : true
        };

        public _formData : any = {

        };

        constructor(private scope, private location, private http, private window ,public contentService,public content, public contents) {
            if(content){
                this._formData = content;
            }
            if(contents && !contentService.contents){
                contentService.contents = contents;
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
    backApp.controller('ContentController', ['$scope', '$location', '$http', '$window','ContentService','content','contents', ContentController]);
}