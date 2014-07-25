// Gulp and utils
var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    size         = require('gulp-size'),
    rename       = require('gulp-rename'),
    watch        = require('gulp-watch'),
    notify       = require('gulp-notify'),
    connect      = require('gulp-connect'),
    livereload   = require('gulp-livereload'),
    lr           = require('tiny-lr'),
    server       = lr(),
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
    return gulp.src(['components/font-awesome/fonts/**/*', , 'components/bootstrap-sass/vendor/assets/fonts/**/*'])
        .on('error', gutil.log)
        .pipe(size())
        .pipe(gulp.dest('fonts'))
        .pipe(livereload(server));
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
gulp.task('assets', ['fonts', 'styles', 'images']);

// Dev
gulp.task('dev', ['assets', 'connect'], function () {
    gulp.start('watch');
});

// Default task
gulp.task('default', ['dev']);
