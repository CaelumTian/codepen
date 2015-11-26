var gulp = require("gulp"),
	gulpLoadPlugins = require('gulp-load-plugins'),
    del = require("del"),
    Browsersync = require('browser-sync').create(),
    reload = Browsersync.reload;
const $ =  gulpLoadPlugins();
gulp.task("less", function() {
	return gulp.src("./lib/styles/less/*.less")
			   .pipe($.less())
			   .pipe($.autoprefixer())
			   .pipe(gulp.dest("./lib/styles/css"))
			   .pipe(reload({stream: true}));
});
gulp.task("js", function() {
	return gulp.src("./lib/scripts/*.js")
			   .pipe($.jshint(".jshintrc"))
			   .pipe($.jshint.reporter('default'))
			   .pipe($.uglify())
			   .pipe(gulp.dest("./js"));
});
gulp.task("clean", function() {
	//del(['./styles/**/*.css']);
});
gulp.task('server', ['less', 'js'], function() {
    Browsersync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./lib/styles/less/*.less", ['less']);
    gulp.watch("*.html").on("change", reload);
});