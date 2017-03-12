const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');
const gulp = require('gulp');
const webpackfile = require('./webpack.config');
const babel = require('gulp-babel');
gulp.task('uglify',() => {
  gulp.src('./src/index.js')
    .pipe(webpack(webpackfile))
    .pipe(babel({
      presets:['es2015']
    }))
  .pipe(gulp.dest('./js'))
})
gulp.task('watch',() => {
   gulp.watch('./src/*.js', ['uglify']);
})