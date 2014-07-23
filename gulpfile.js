// Gulp and utils
var gulp       = require('gulp'),
  gutil        = require('gulp-util'),
  size         = require('gulp-size'),
  rename       = require('gulp-rename'),
  clean        = require('gulp-clean'),
  watch        = require('gulp-watch'),
  notify       = require('gulp-notify'),
  connect      = require('gulp-connect'),
  livereload   = require('gulp-livereload'),
  lr           = require('tiny-lr'),
  server       = lr(),
  // Scripts [coffee, js]
  jshint       = require('gulp-jshint'),
  uglify       = require('gulp-uglify'),
  concat       = require('gulp-concat'),
  // Browserify
  browserify   = require('gulp-browserify'),
  // Variables
  __ports = {
    server: 1355,
    livereload: 35749
  },
  __folders = {
    source: 'src',
    dest: 'build'
  };

// JavaScripts lint
gulp.task('jshint', function () {
  return gulp.src(__folders.source + '/{,/*}*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(size())
    .pipe(gulp.dest(__folders.source))
    .pipe(livereload(server))
    .pipe(notify({
      message: 'Scripts task completed @ <%= options.date %>',
      templateOptions: {
        date: new Date()
      }
    }));
});

// Clean
gulp.task('clean', function () {
  return gulp.src(__folders.dest, {
      read: false
    })
    .pipe(clean())
    .pipe(notify({
      message: 'Clean task completed @ <%= options.date %>',
      templateOptions: {
        date: new Date()
      }
    }));
});

// Browserify
gulp.task('browserify', function () {
  return gulp.src(__folders.source + '/ccn-bridge.js')
    .pipe(browserify({
      standalone: 'CCNBridge',
      debug: true
    }))
    .pipe(concat('ccn-bridge.js'))
    .pipe(size())
    .pipe(gulp.dest(__folders.dest))
    .pipe(uglify({
      bare: true
    }))
    .on('error', gutil.log)
    .pipe(size())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(__folders.dest))
    .pipe(notify({
      message: 'Browserify task completed @ <%= options.date %>',
      templateOptions: {
        date: new Date()
      }
    }));
});

// Connect & livereload
gulp.task('connect', function () {
  connect.server({
    root: __dirname + '/',
    port: __ports.server,
    livereload: true
  });
});

// Watch
gulp.task('watch', function () {
  // Listen on port 35730
  server.listen(__ports.livereload, function (error) {
    if (error) {
      return console.error(error);
    }

    // Watch .js files
    gulp.watch(__folders.source + '/{,*/}*.js', ['jshint', 'build']);
  });
});

// Serve
gulp.task('serve', ['jshint', 'build', 'connect'], function () {
  gulp.start('watch');
});

// Build
gulp.task('build', ['clean', 'browserify']);

// Default task
gulp.task('default', ['serve']);
