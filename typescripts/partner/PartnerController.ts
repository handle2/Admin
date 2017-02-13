/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IPartnerController{
        save(back:boolean):void;
    }

    interface IPartnerOption{

    }

    class PartnerOption implements IPartnerOption{
        public name;
        public method;
        public permission;
        public buttonclass;
    }

    class PartnerController implements IPartnerController{

        public options : Array<any> = [];

        public _formData : any = {

        };

        constructor(private scope, private location, private http, private window ,public partnerService,public partner, public partners, public roles) {

            if(partner){
                this._formData = partner;
            }
            if(partners && !partnerService.partners){
                this.initOptions();
                partnerService.partners = partners;
            }



        }

        private initOptions(){
            var self = this;
            var option = new PartnerOption();
            option.name = "send_new_password";
            option.method = function (id) {
                self.sendPassword(id);
            };

            option.permission = "partner.password";
            option.buttonclass = "btn btn-info";

            this.options.push(option);
        }

        public sendPassword(id){
            this.http.get('/admin/partner/sendPassword/'+id).then(function (response) {
                alert(angular.fromJson(response.data));
            },function (response) {

            });
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
    backApp.controller('PartnerController', ['$scope', '$location', '$http', '$window','PartnerService','partner','partners','roles', PartnerController]);
}