const gulp = require('gulp'),
      spawn = require('child_process').spawn,
      gutil = require('gulp-util'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      postcss = require('gulp-postcss'),
      stylus = require('gulp-stylus'),
      concat = require('gulp-concat'),
      del = require('del'),
      lost = require('lost')


const paths = {
  stylesRoot: 'src/styles/style.styl',
  styles: 'src/styles/**/*',
  styleDest: 'resources/public/css',
  cssBuild: 'resources/public/css/style.css',
  jsBuild: 'resources/public/js/dist/app.js',
  fontBuild: 'resources/public/fonts/**.*',
  dist: 'dist'
}


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


function leinClean(callback) {
  del(paths.jsBuild).then(() => {
    let child = spawn('lein', ['clean']),
        stdout = "",
        stderr = ""

    child.stdout.setEncoding('utf8')
    child.stderr.setEncoding('utf8')

    child.stdout.on('data', data => {
      stdout += data
      gutil.log(stdout)
    })

    child.stderr.on('data', data => {
      stderr += data
      gutil.log(stderr)
    })

    child.on('close', code => {
      gutil.log('Lein clean complete', code)
      callback && callback()
    })
  })
}


function leinCljsbuild(callback) {
  let child2 = spawn('lein', ['cljsbuild', 'once', 'min']),
      stdout = "",
      stderr = ""

  child2.stdout.setEncoding('utf8')
  child2.stderr.setEncoding('utf8')

  child2.stdout.on('data', data => {
    stdout += data
    gutil.log(stdout)
  })

  child2.stderr.on('data', data => {
    stderr += data
    gutil.log(stderr)
  })

  child2.on('close', code => {
    gutil.log('Compilation done with exitcode', code)

    callback && callback()
  })
}


gulp.task('minify', function() {
  leinClean(() => leinCljsbuild(() => {
    setTimeout(function() {process.exit()}, 1000)
  }))
})


gulp.task('copy-js', function() {
  gulp.src([paths.jsBuild, "resources/build/dist-export.js"])
    .pipe(concat('tvs-flow-editor.js'))
    .pipe(gulp.dest("resources/public/js/dist/"))
    .on('end', () => {
      gulp.src("resources/public/js/dist/tvs-flow-editor.js")
        .pipe(gulp.dest(paths.dist))
    })
})

gulp.task('copy-css', function() {
  gulp.src(paths.cssBuild)
    .pipe(gulp.dest(paths.dist + '/css'))
})

gulp.task('copy-fonts', function() {
  gulp.src(paths.fontBuild)
    .pipe(gulp.dest(paths.dist + '/fonts'))
})


gulp.task('watch-build', function() {
  gulp.watch([paths.cssBuild], ['copy-css'])
  gulp.watch([paths.jsBuild], ['copy-js'])
})


gulp.task('default', ['styles', 'watch'])

gulp.task('build', ['minify', 'watch-build', 'styles', 'copy-fonts'])
