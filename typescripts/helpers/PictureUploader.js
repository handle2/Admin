/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var PictureUploader = (function () {
        function PictureUploader(scope, http, commonService) {
            this.scope = scope;
            this.http = http;
            this.commonService = commonService;
            this.files = [];
            this.current = 0;
        }
        PictureUploader.prototype.setCurrent = function (current) {
            this.current = current;
        };
        PictureUploader.prototype.addImages = function () {
            angular.element(document.querySelector('#fileInput')).trigger('click');
        };
        PictureUploader.prototype.setStuff = function () {
            this.scope.images[this.current].bounds.left = 211;
            this.scope.images[this.current].bounds.right = 780;
            this.scope.images[this.current].bounds.top = 985;
            this.scope.images[this.current].bounds.bottom = 701;
            console.log(this.files[this.current].bounds);
        };
        return PictureUploader;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('PictureUploader', ['$scope', '$http', 'CommonService', PictureUploader]);
    backApp.directive('pictureUploader', function () {
        return {
            templateUrl: '/modules/Admin/views/directives/helpers/picture-uploader.html',
            controller: 'PictureUploader',
            controllerAs: 'ctrl',
            restrict: 'E',
            scope: {
                images: '='
            }
        };
    });
    backApp.directive("fileread", [function () {
            return {
                scope: {
                    fileread: "=",
                    sizes: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        for (var i = 0; i < changeEvent.target.files.length; i++) {
                            var reader = new FileReader();
                            reader.onload = function (loadEvent) {
                                scope.$apply(function () {
                                    var image = {
                                        sourceImage: loadEvent.target.result,
                                        croppedImage: null,
                                        bounds: {
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            bottom: 0
                                        }
                                    };
                                    if (!scope.fileread) {
                                        scope.fileread = [];
                                    }
                                    scope.fileread.push(image);
                                });
                            };
                            reader.readAsDataURL(changeEvent.target.files[i]);
                        }
                    });
                }
            };
        }]);
})(backApp || (backApp = {}));
//# sourceMappingURL=PictureUploader.js.map