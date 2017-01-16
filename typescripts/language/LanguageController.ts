/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface ILanguageController{
        save(back:boolean):void;
    }

    class LanguageController implements ILanguageController{

        public _formData : any = {

        };

        constructor(private scope, private location, private http, private window ,public languageService,public language, public languages) {
            if(language){
                this._formData = language;
            }
            if(languages && !languageService.languages){
                languageService.languages = languages;
            }
        }

        public save(back:boolean){
            var self = this;
            var data = angular.toJson(this._formData);
            this.http.post('/admin/language/save',data).then(function (response) {
                var id = angular.fromJson(response.data);
                if(back){
                    self.window.open('/admin/language', '_self');
                }else{
                    self.window.open('/admin/language/edit/'+id, '_self');
                }
            },function (response) {

            });
        }

    }

    var backApp = angular.module('backApp');
    backApp.controller('LanguageController', ['$scope', '$location', '$http', '$window','LanguageService','language','languages', LanguageController]);
}