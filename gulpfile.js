var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var rename = require('gulp-rename');

function notity(err) {
    console.log(err.toString());
    // 阻止 gulp 进程退出
    this.emit('end');
}


gulp.task('serve', /*['sass', 'babel'],*/ function () {
    browserSync.init({
        server: "./build/"
    });
    gulp.watch("build/vue/*.css").on('change', browserSync.reload);
    gulp.watch("build/vue/*.js").on('change', browserSync.reload);
    gulp.watch("build/vue/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function () {
//     return gulp.src("build/vue/index.scss")
//         .pipe(sass())
//         .on('error', notity)
//         .pipe(gulp.dest("app/css"))
//         .pipe(browserSync.stream());
// });

// gulp.task('babel', function () {
//     return gulp.src('app/js/index-es6.js')
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .on('error', notity)
//         .pipe(rename('index.js'))
//         .pipe(gulp.dest('app/js'))
// });

gulp.task('default', ['serve']);