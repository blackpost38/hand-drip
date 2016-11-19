var gulp = require('gulp');
var browserify = require('browserify');
var stringify = require('stringify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();

gulp.task('transform-js', function () {
	console.log('transform-js');
	var b = browserify('./js/main.js')
		.transform(babelify, { presets: ['es2015'] })
		.transform(stringify, {
			appliesTo: { includeExtensions: ['.html'] },
			minify: true
    });

  return b.bundle()
		.pipe(source('main.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js-watch', ['transform-js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: { baseDir: './' }
	});
});

gulp.task('source-watch', function () {
	gulp.watch(['js/*.js', 'js/**/*.js'], ['js-watch']);
	gulp.watch(['*.html', '**/*.html']).on('change', browserSync.reload);
})

gulp.task('default', ['browser-sync', 'source-watch']);
