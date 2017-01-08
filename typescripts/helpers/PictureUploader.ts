/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    /**
     * Csodás interfacek azért kellenek ,hogy a phpstorm ne érezze sértve magát a felhasznált változók miatt
     */

    interface FileReaderEventTarget extends EventTarget {
        result:string
    }

    interface IMyScope extends ng.IScope
    {
        fileread: any;
        sizes: any;
    }

    interface FileReaderEvent extends Event {
        target: FileReaderEventTarget;
        getMessage():string;
    }
    
    interface IPictureUploader{
        setCurrent(current:number):void;
        addImages():void;
    }
    class PictureUploader implements IPictureUploader{

        public files : Array<any> = [];
        public current = 0;

        constructor(private scope,private http,private commonService) {
        }

        public setCurrent(current){
            this.current = current;
        }

        public addImages(){
            angular.element(document.querySelector('#fileInput')).trigger('click');
        }

        public setStuff(){
            this.scope.images[this.current].bounds.left = 211;
            this.scope.images[this.current].bounds.right = 780;
            this.scope.images[this.current].bounds.top = 985;
            this.scope.images[this.current].bounds.bottom = 701;
            console.log(this.files[this.current].bounds);
        }

    }

    var backApp = angular.module('backApp');
    backApp.controller('PictureUploader', ['$scope','$http','CommonService', PictureUploader]);

    backApp.directive('pictureUploader', function() {
        return {
            templateUrl : '/modules/Admin/views/directives/helpers/picture-uploader.html',
            controller : 'PictureUploader',
            controllerAs: 'ctrl',
            restrict: 'E',
            scope : {
                images : '='
            }
        };
    });

    backApp.directive("fileread", [function () {
        return {
            scope: {
                fileread: "=",
                sizes: "="
            },
            link: function (scope : IMyScope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    for(var i = 0;i < changeEvent.target.files.length; i++){
                        var reader = new FileReader();
                        reader.onload = function (loadEvent:FileReaderEvent) {
                            scope.$apply(function () {
                                var image = {
                                    sourceImage: loadEvent.target.result,
                                    croppedImage : null,
                                    bounds:{
                                        left : 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0
                                    }
                                };
                                if(!scope.fileread){
                                    scope.fileread = [];
                                }
                                scope.fileread.push(image);
                            });
                        };
                        reader.readAsDataURL(changeEvent.target.files[i]);
                    }
                });
            }
        }
    }]);
}