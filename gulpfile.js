"use strict";

// Configuration
var headerTag;
var siteData;

// References
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var gulpHeader = require('gulp-header');
var concat = require('gulp-concat');
var extend = require('node.extend');
var flatten = require('gulp-flatten');
var del = require('del');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var path = require("path");
var fs = require("fs");
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var path = require("path");
var rjs = require('requirejs');
var gulpif = require('gulp-if');
var exec = require('child_process').exec;

// When session starts
gulp.task("default", function(cb) {
  gulpSequence('build', 'browser-sync',cb); //, 'browser-watch'
});

// Browser-sync
gulp.task('browser-sync', function(cb) {
  browserSync({
    server: {
      baseDir: '.'
    }
  });
  gulp.watch('./**/*.scss', { interval: 500 },
    ['build-main-css' , browserSync.reload]);
  cb();
});

// Default
gulp.task("build",function(cb){
  gulpSequence(['build-main-css'],cb);
});

gulp.task('build-main-css', function () {
 return gulp.src('./sass/*.scss')
   .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	 .pipe(concat('main.css'))
   .pipe(gulp.dest('./css'));
});