const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

sass.compiler = require('sass'); // Indica o compilador Dart Sass

// Tarefa para compilar o SASS
gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
  });

// Tarefa para comprimir imagens
gulp.task('imagemin', function () {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// Tarefa para concatenar e minificar o JavaScript
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});

// Tarefa padrão (executada ao digitar "gulp" no terminal)
gulp.task('default', gulp.parallel('sass', 'imagemin', 'js'));

// Tarefa para observar mudanças nos arquivos e executar tarefas automaticamente
gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/images/**/*', gulp.series('imagemin'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
});


