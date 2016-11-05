var gulp = require('gulp');
var browserify = require('browserify');
var stringify = require('stringify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');


gulp.task("transform", function () {
	var b = browserify('./js/main.js')
		.transform(babelify, {presets: ['es2015']})
		.transform(stringify, {
			appliesTo: { includeExtensions: ['.html'] },
			minify: true
    })

  return b.bundle()
		.pipe(source('main.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['transform']);
