"use strict";
var gulp = require('gulp');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var core = require('babel-core/register');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('run-tests', function(){
  return gulp.src('./test/testES6Features.js', {read: false})
    .pipe(mocha({
      reporter: 'nyan',
      compilers: [
        'js:babel-core/register'
      ]
    }));
});

gulp.task('watch-test', function() {
  gulp.watch(['./lib/*.js', './test/testES6Features.js'], ['run-tests', 'lint']);
});

gulp.task('lint', function() {
  return gulp.src(['./lib/*.js','./test/testES6Features.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('build', function(){
  return gulp.src('./lib/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./rebuilt'));
});

gulp.task('default', ['run-tests']);
gulp.task('test', ['run-tests', 'watch-test', 'lint']);
