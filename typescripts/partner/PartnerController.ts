/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IPartnerController{
        save(back:boolean):void;
    }

    class PartnerController implements IPartnerController{

        public _formData : any = {

        };

        constructor(private scope, private location, private http, private window ,public partnerService,public partner, public partners) {
            if(partner){
                this._formData = partner;
            }
            if(partners && !partnerService.partners){
                partnerService.partners = partners;
            }
        }

        public save(back:boolean){
            var self = this;
            var data = angular.toJson(this._formData);
            this.http.post('/admin/partner/save',data).then(function (response) {
                var id = angular.fromJson(response.data);
                if(back){
                    self.window.open('/admin/partner', '_self');
                }else{
                    self.window.open('/admin/partner/edit/'+id, '_self');
                }
            },function (response) {

            });
        }

    }

    var backApp = angular.module('backApp');
    backApp.controller('PartnerController', ['$scope', '$location', '$http', '$window','PartnerService','partner','partners', PartnerController]);
}