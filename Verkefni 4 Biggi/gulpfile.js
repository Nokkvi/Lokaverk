// Every module that gulp uses has to be referenced here so that the build
// system knows where to go to get stuff and what it is supposed to use.
const gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
const stylelint = require('gulp-stylelint');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');

gulp.task('lint-javascript', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['./src/*.js','!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('lint-scss', () => {
  return gulp.src('src/*.scss').pipe(stylelint({
    reporters: [{formatter: 'string', console: true}]
  }));
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      // Tells browsersync to use ./ as base directory for server
      baseDir: "./"
    }
  });

  // Tells gulp to watch for changes in the base directory. When the change
  // occurs, gulp activates the reload function in
  gulp.watch("./*.html").on("change", reload);

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch("src/*.js", ['js-watch']);
});

// create a task that ensures the 'js' task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// process JS files and return the stream when babel is done.
gulp.task('js', ['babel'], function (done) {
    return gulp.src('./src/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {
  // Tells gulp to take all files ending with .scss in the /src directory
  return gulp.src('./src/*.scss')
  // Error handling if sass can"t convert files
  .pipe(sass().on('error', sass.logError))
  // Take resulting files and move them to directory /dist/css (pipe the
  // files to /dist/css)
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('babel', () => {
  return gulp.src('./src/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('lint', ['lint-scss', 'lint-javascript']);

gulp.task('default', ['lint', 'sass', 'babel', 'serve']);