var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var express = require('express');

// config of files
var wcConfig = {
	assets: {
		css: [
			'bower_components/normalize.css/normalize.css'
		],
		html: [
			'html/index.html'
		]
	}
};

// clean dist
gulp.task('clean', function (cb) {
	del('dist', cb);
});

// compile scss
gulp.task('scss', function () {
	gulp.src('scss/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'));
});

// copy css assets
gulp.task('copy:css', function () {
	gulp.src(wcConfig.assets.css)
		.pipe(gulp.dest('dist/css'));
});

gulp.task('copy:html', function () {
	gulp.src(wcConfig.assets.html)
		.pipe(gulp.dest('dist'));
});

// start static web server
gulp.task('express', function () {
	var app = express();
	app.use(express.static(__dirname + '/dist'));
	app.listen(4000);
});

// dev task
gulp.task('dev', ['scss', 'copy:html', 'copy:css'], function () {

});

// watch files
gulp.task('watch', ['dev', 'express'], function () {
	gulp.watch('scss/*', ['scss']);
	gulp.watch('html/*', ['copy:html']);
});