"use strict";
require('babel-core/register');
const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');

gulp.task('run-tests', () => {
  return gulp.src('./test/testES6Features.js', {read: false})
    .pipe(mocha({
      reporter: 'nyan',
      compilers: [
        'js:babel-core/register'
      ]
    }));
});

gulp.task('watch-test', () => {
  gulp.watch(['./lib/*.js', './test/testES6Features.js'], ['run-tests', 'lint']);
});

gulp.task('lint', () => {
  return gulp.src(['./lib/*.js','./test/testES6Features.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('build', () => {
	return gulp.src('lib/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('test', ['run-tests', 'watch-test', 'lint']);
