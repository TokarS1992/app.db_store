"use strict";

const gulp = require('gulp');
const rename = require('gulp-rename');
const less = require('gulp-less');
const minifyCss = require('gulp-clean-css');
const uglifyjs = require('gulp-uglifyjs');
const wrapPipe = require('./backend/libs/gulpError');
const concat = require('gulp-concat');

var paths = {
    less: [
        'public/less/*.less'
    ],
    js: [
        'public/js/bundle.js'
    ]
}

gulp.task('less', wrapPipe(function(success, error) {
    return gulp.src(paths.less)
        .pipe(less().on('error', error))
        .pipe(concat('style.css'))
        // .pipe(minifyCss())
        .pipe(gulp.dest('public/css'))
}));

gulp.task('uglify', wrapPipe(function(success, error) {
    return gulp.src(paths.js)
        .pipe(uglifyjs('bundle.js', {
            outSourceMap: false
        }))
        .pipe(gulp.dest('public/js'));
}));

gulp.task('default', function() {
    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.js, ['uglify']);
});