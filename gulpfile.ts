/// <reference path="./typings/tsd" />

import gulp = require("gulp");
import typescript = require("gulp-typescript");
import concat = require('gulp-concat');
import order = require("gulp-order");

gulp.task("typescript",()=>
    gulp.src("./typescripts/**/*.ts")
        .pipe(typescript())
        .pipe(gulp.dest("./dist"))
);



gulp.task('init',["typescript"], function() {
    return gulp.src('./dist/**/*.js')
        .pipe(order(['/dist/backApp.js']))
        .pipe(concat('backend-scripts.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('watch',function () {
    gulp.watch('./typescripts/**/*.ts',['init']);
});