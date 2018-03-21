// REQUIRES

var gulp = require('gulp');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');


var sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  cssnano = require("gulp-cssnano"),
  rename = require("gulp-rename"),
  prettyError = require("gulp-prettyerror");


// TASKS

gulp.task('scripts', ['lint'], function() {
  return gulp
    .src('.js/*.js') // What files do we want gulp to consume?
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
    .pipe(gulp.dest('./build/js')); // Where do we put the result?
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});


gulp.task('watch', function() {
    gulp.watch(['js/*.js', 'sass/*.scss', '*.html'] , [ 'lint', 'scripts', 'sass', 'reload']);
 });
 
gulp.task('reload', ['scripts'], function() {
    browserSync.reload();
 });

 gulp.task('lint', function() {
    return gulp.src(['js/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// gulp.task('script', function(){
// })

gulp.task("sass", function() {
  return gulp
    .src("./sass/styles.scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"));
});

gulp.task('default', [ 'browser-sync', 'lint', 'scripts' , 'sass', 'watch'])
