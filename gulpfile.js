
const gulp  = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const del = require('del');

const srcpath="develop/";
const dstpath="yotube/";

gulp.task('stream', function () {
    // Endless stream mode 
    //livereload.listen();
    gulp.watch([srcpath+'html/*.html'],['htmlcopy']);
    gulp.watch([srcpath+'js/*.js'],['copyjs']);
    gulp.watch([srcpath+'manifest.json'],['copymanifest']);
    gulp.watch([srcpath+'css/*.css'],['minifycss']);
});


gulp.task('htmlcopy', function () {
   return gulp.src(srcpath+'html/*.html')
      .pipe(gulp.dest(dstpath))
});

 gulp.task('copyjs', function () {

   return browserify( srcpath+'js/main.js',{debug:true})
    .bundle()
        // Передаем имя файла, который получим на выходе, vinyl-source-stream
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dstpath))
        //return gulp.src(srcpath+'/js/*.js').pipe(gulp.dest(dstpath))
 });

 gulp.task('minifycss', function () {
    return gulp.src(srcpath+'/css/*.css')
         .pipe(autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false
         }))
         .pipe(concatCss("popupStyle.css"))
         .pipe(cleanCSS({compatibility: 'ie8'}))
         .pipe(gulp.dest(dstpath))
 });

 gulp.task('copymanifest', function () {
    return gulp.src(srcpath+'manifest.json')
       .pipe(gulp.dest(dstpath))
 });

gulp.task('images', function() {
  return gulp.src(srcpath+'images/*.*')
  .pipe(gulp.dest(dstpath+'images'))
});
gulp.task('clearfiles', function(callback){
	return del([dstpath]);
});

gulp.task('build',['htmlcopy','copyjs','images','minifycss','copymanifest'], function () {
      console.log(`сборка завершена!`);
});

gulp.task('default', function (callback) {
	runSequence('clearfiles','build',callback);
});