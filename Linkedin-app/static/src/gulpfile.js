var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    pngquant = require('imagemin-pngquant');


// Task to compile SCSS
gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: false,
    })
    .on("error", notify.onError(function(error) {
      return "Failed to Compile SCSS: " + error.message;
    })))
    .pipe(autoprefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../css/'))
    .pipe(notify("SCSS Compiled Successfully :)"));
});

// Task to Minify JS
gulp.task('compressjs', function() {
  return gulp.src(['./js/**/*.js'])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../js/'));
});

// Minify Images
gulp.task('compImages', function() {
  return gulp.src('./img/**/*.png')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('../img/'));
});


// Gulp Watch Task
gulp.task('watch', function () {
   gulp.watch('./scss/**/*.scss', ['sass']),
   gulp.watch('./js/**/*.js', ['compressjs']);
   //gulp.watch('../templates/**/*.html');
});

// Gulp Default Task
gulp.task('default', ['watch']);

/*
// Gulp Default Task
gulp.task('default', function() {
  console.log("Consola :3");
});
*/

// Gulp Default Task
gulp.task('default', ['watch']);


// Gulp Build Task
gulp.task('build', function() {
  runSequence('imagemin', 'compressjs');
});