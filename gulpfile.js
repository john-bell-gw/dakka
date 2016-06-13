var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
				.pipe(autoprefixer({
					browsers: ['last 2 versions'],
					cascade: false
				}))
				.pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
