const gulp = require('gulp'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      postcss = require('gulp-postcss'),
      stylus = require('gulp-stylus'),
      lost = require('lost'),
      webpack = require('webpack-stream')


const paths = {
  stylesRoot: 'src/styles/style.styl',
  styles: 'src/styles/**/*',
  styleDest: 'resources/public/css'
}


gulp.task('flow-runtime', function() {
  return gulp.src('libs/flow/lib/index.js')
    .pipe(webpack( require('./libs/flow/webpack.config.js') ))
    .pipe(gulp.dest('resources/public/js/libs'));
})


gulp.task('styles', function() {
  gulp.src(paths.stylesRoot)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .on('error', function(e) {
      console.log(e)
      this.emit('end')
    })
    .pipe(postcss([lost()]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styleDest))
})


gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles'])
})


gulp.task('default', ['styles', 'watch'])
