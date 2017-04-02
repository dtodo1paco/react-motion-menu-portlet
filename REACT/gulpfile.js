var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require("vinyl-buffer");
var transform = require('vinyl-transform');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  




var uglify = require('gulp-uglify');


const paths = {
  src: './app',
  js: '../docroot/js/app',
  dest: './dist',
  bundle: 'bundle.js',
  scripts: 'scripts.js',
  bundleMin: 'bundle.min.js',
  entryPoint: './app/app.jsx'
};

gulp.task('scripts', ['build'], function() {  
    return gulp.src(paths.bundle)
        .pipe(concat(paths.scripts))
        .pipe(gulp.dest(paths.dest))
	.pipe(rename(paths.bundleMin))
	.pipe(uglify())
	.pipe(gulp.dest(paths.dest));
});

gulp.task('build', function () {
    return browserify({entries: paths.entryPoint, extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source(paths.bundle))
	.pipe(buffer())
//	.pipe(uglify())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./app/*.jsx', ['build']);
});

gulp.task('copy', function() {
	gulp.src([paths.src+'/**/*']).pipe(gulp.dest(paths.js));
});

gulp.task('default', ['watch']);
