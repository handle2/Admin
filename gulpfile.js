/// <reference path="./typings/tsd" />
"use strict";
var gulp = require("gulp");
var typescript = require("gulp-typescript");
var concat = require('gulp-concat');
var order = require("gulp-order");
gulp.task("typescript", function () {
    return gulp.src("./typescripts/**/*.ts")
        .pipe(typescript())
        .pipe(gulp.dest("./dist"));
});
gulp.task('scripts', ["typescript"], function () {
    return gulp.src('./dist/**/*.js')
        .pipe(order(['/dist/backApp.js']))
        .pipe(concat('backend-scripts.js'))
        .pipe(gulp.dest('./'));
});
gulp.task('watch', function () {
    gulp.watch('./typescripts/**/*.ts', ['scripts']);
});
//# sourceMappingURL=gulpfile.js.map