var gulp = require('gulp');
var del = require('del');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

var connect = require('gulp-connect');

var zip = require('gulp-zip');
var upload = require('gulp-file-post');
var runSequence = require('run-sequence');

var dist = 'publish/';
var zipFile = 'publish.zip';

gulp.task('compress', function(cb) {
  return gulp.src('publish/**/*')
    .pipe(zip(zipFile))
    .pipe(gulp.dest(dist));
});

gulp.task('upload', function() {
  return gulp.src(dist + zipFile)
    .pipe(upload({
      url: 'http://wapstatic.kf0309.3g.qq.com/receiver/receiver2.php',
      data: {
        to: '/data/wapstatic/keithytsai/designwk'
      }
    })
  );
});

gulp.task('uploadCss', function() {
  return gulp.src(dist + 'css/**/*')
    .pipe(upload({
      url: 'http://wapstatic.kf0309.3g.qq.com/receiver/receiver2.php',
      root: 'publish', // for multiple files
      remotePath: '/data/wapstatic/keithytsai/designwk'
    })
  );
});

gulp.task('publish', function() {
  runSequence(
    'compress',
    'upload'
  );
});

gulp.task('connect', function() {
    connect.server({
        root: 'publish',
        livereload: true,
        index: false
    });
});

gulp.task('watchcss', function() {
    return gulp.src('publish/css/**')
        .pipe(postcss([ autoprefixer({ browsers: ['> 5%', 'ie >= 8'] }), precss ]))
        .pipe(gulp.dest('./publish/css'));
});

gulp.task('watchhtml', function() {
    return gulp.src('publish/html/**')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./publish/html/**', ['watchhtml']);
    gulp.watch('./publish/css/**', ['watchcss']);
});

gulp.task('clean', function() {
    del.sync(['publish/**', '!publish', '!publish/.*']);
});

gulp.task('clean-sprites', function() {
    del.sync(['publish/sprite/**', '!publish/sprite']);
});

gulp.task('default', ['connect', 'watch']);
