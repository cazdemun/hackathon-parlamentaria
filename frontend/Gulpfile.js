var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    compass = require('gulp-compass'),
    minifycss = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    notify = require('gulp-notify'),
    del = require('del'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    fs = require('fs-extra'),
    csvtojson = require('gulp-csvtojson'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('web', function() {
  browserSync.init({
    port: 8080,
    server: {
      baseDir: "./src/"
    }
  });
});

gulp.task('default', ['styles','views','web', 'watch']);

gulp.task('json', function() {
  return gulp.src('./src/data/data.csv')
      .pipe(csvtojson({ toArrayString: true }))
      .pipe(gulp.dest('./src/data'));
});

// gulp.task('styles', ['cleanCSS'], function() {
gulp.task('styles', function() {
  gulp.src('./src/sass/app.scss') //lee estos archivos
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./src/css'))
      .pipe(browserSync.stream())
      // .pipe(minifycss({
      //   keepBreaks: false
      // }))
      // .pipe(rename({ suffix: '.min' }))
      // .pipe(gulp.dest('./src/css'))
      .pipe(notify({ message: 'CSS - task completed', onLast: true}));
});

gulp.task("jshint", function() {
  return gulp.src(['/src/js/*.js']) // pasamos nuestros propios archivos js
      .pipe(jshint()) // los revisamos
      .pipe(jshint.reporter('default')) // pedimos a jshint que nos muestre los errores usando un revisor estándar
      .pipe(notify({ message: 'JSHints task complete' })); // notifcamos al sistema
});

gulp.task('scripts-prod', ['cleanJS'], function() {
  gulp.src('./src/js/*')
      .pipe(gulp.dest('./src/js')) // trabajaremos con el archivo de jquery y nuestros js
      .pipe(uglify().on('error', function(e) {
          console.log(e);
      }))
      .pipe(rename({ suffix: '.min' })) // hacemos una copia y le agregamos el prefijo min
      .pipe(gulp.dest('./src/js'))
      .pipe(notify({ message: 'Scripts task complete' })); // avisamos al sistema que la tarea se completó
});

gulp.task('images', function() {
  return gulp.src('src/img/*') // ruta a nuestras imágenes, queremos que busque a dos niveles
      .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })) // proceso de optimización
      .pipe(gulp.dest('src/img')) // guardamos las imágenes procesadas
      .pipe(notify({ message: 'Images task complete' })); // avisamos al sistema
});

gulp.task('watch', function() {
  gulp.watch('./src/sass/**/*.scss', ['styles']);
  gulp.watch(['./src/views/**/*.pug'], ['views']);
  gulp.watch(['./src/js/**/*.js'], reload);
});

gulp.task('views', function () {
  return gulp.src([
      './src/views/pages/**/*.pug',
      '!./src/views/pages/pse-message/**/*'
    ])
    .pipe(pug({
      pretty: true
    }))
    .on('error', onError)
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./src/'))
    .on("end", function(){
      browserSync.reload();
    })
    .pipe(notify({ message: 'Views - task completed', onLast: true}));
});

gulp.task('cleanCSS', function() {
  fs.removeSync('./src/css/*');
});

gulp.task('cleanJS', function() {
  fs.removeSync('./src/js');
});

gulp.task('clean', function(cb) {
  del(['./public/**'], cb)
});

// Método para motrar errores en consola
function onError(err) {
  console.log(err);
  this.emit('end');
};

gulp.task("rename-jade", function(){
  return gulp.src([
      './src/views/**/*.jade',
      './src/views/**/*.pug'
    ])
    .pipe(rename(function(path){
      path.extname = ".pug"
    }))
    .pipe(gulp.dest('./src/views'))
    .pipe(notify({ message: 'Rename - task completed', onLast: true}));
});
