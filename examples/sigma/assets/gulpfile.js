// Gulp and utils
var gulp         = require('gulp'),
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
  // Scripts [js]
  jshint       = require('gulp-jshint'),
  uglify       = require('gulp-uglify'),
  concat       = require('gulp-concat'),
  // Styles [sass, css]
  sass         = require('gulp-ruby-sass'),
  minifycss    = require('gulp-minify-css'),
  csso         = require('gulp-csso'),
  autoprefixer = require('gulp-autoprefixer'),
  // Images and static assets
  imagemin     = require('gulp-imagemin'),
  __ports = {
    server: 1347,
    livereload: 35736
  };

// JavaScripts lint
gulp.task('jshint', function () {
  return gulp.src(['js/{,/*}*.js', '!js/vendor/{,/*}*.*'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(size())
    .pipe(gulp.dest('js'))
    .pipe(livereload(server))
    .pipe(notify({
      message: 'Scripts task completed @ <%= options.date %>',
      templateOptions: {
        date: new Date()
      }
    }));
});

// Styles
gulp.task('styles', function () {
  return gulp.src([
      'sass/{,*/}*.{scss,sass}',
      '!sass/{,*/}*_*.{scss,sass}',
      '!sass/bourbon/*.{scss,sass}'
    ])
    .pipe(sass({
      style: 'expanded',
      quiet: true,
      trace: true
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('css'))
    .pipe(autoprefixer('last 1 version'))
    .pipe(size())
    .pipe(csso())
    .pipe(minifycss())
    .pipe(size())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'))
    .pipe(livereload(server))
    .pipe(notify({
      message: 'Styles task completed @ <%= options.date %>',
      templateOptions: {
        date: new Date()
      }
    }));
});

// Images
gulp.task('images', function () {
  return gulp.src('images/**/*.{jpg,gif,png}')
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .on('error', gutil.log)
    .pipe(size())
    .pipe(gulp.dest('images'))
    .pipe(livereload(server));
});

// Fonts
gulp.task('fonts', function () {
  return gulp.src(['components/font-awesome/fonts/**/*', 'components/bootstrap-sass/vendor/assets/fonts/**/*'])
    .on('error', gutil.log)
    .pipe(size())
    .pipe(gulp.dest('fonts'))
    .pipe(livereload(server));
});

// Clean
gulp.task('clean', function () {
  return gulp.src('../build', {
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

// Vendor & sources concatenation
gulp.task('concat-scripts', function () {
  gulp.src('js/{,/*}*.js')
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('../build/assets/js'))
    .pipe(notify({
      message: 'Scripts concatenation task completed @ <%= options.date %>',
      templateOptions: {
        date: new Date()
      }
    }));
});

gulp.task('concat-stylesheets', function () {
  gulp.src('css/{,/*}*.css')
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('../build/assets/css'))
    .pipe(notify({
      message: 'Stylesheets concatenation task completed @ <%= options.date %>',
      templateOptions: {
        date: new Date()
      }
    }));
});

gulp.task('concat', ['concat-scripts', 'concat-stylesheets']);

gulp.task('copy', function () {
  gulp.src('fonts/{,/*}*.*')
    .pipe(gulp.dest('../build/assets/fonts'));
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

    // Watch .scss files
    gulp.watch('sass/{,*/}*.scss', ['styles']);
  });
});

// Assets
gulp.task('assets', ['fonts', 'styles', 'jshint', 'images']);

// Dev
gulp.task('dev', ['assets', 'connect'], function () {
  gulp.start('watch');
});

// Default task
gulp.task('default', ['dev']);
