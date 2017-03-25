const gulp = require("gulp"),
    gulpsync = require("gulp-sync")(gulp),
    clean = require("gulp-clean"),
    nodemon = require("gulp-nodemon"),
    es = require('event-stream'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    scsslint = require('gulp-scss-lint'),
    eslint = require("gulp-eslint");


gulp.task("clean", () => {
    return gulp.src("build", { read: false })
        .pipe(clean({ force: true }));
});

//  Lint
gulp.task('lint:scss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(scsslint());
});

gulp.task("lint:js", () => {
    return gulp.src(["src/**/*.js", "!node_modules/**"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("lint", ["lint:js"]);

//  Compile
const sass = require('gulp-sass'),
    babel = require("gulp-babel");

gulp.task('compile:sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});

gulp.task("compile:js", () => {
    return gulp.src("./src/js/**/*.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest("build/js"));
});

gulp.task("compile", gulpsync.sync(["compile:sass", "compile:js"]));

//Uglify
const uglify = require('gulp-uglify'),
    pump = require('pump'),
    uglifycss = require('gulp-uglifycss');


gulp.task('uglify:js', function (cb) {
    return gulp.src("./build/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./build"));
    });

gulp.task('uglify:css', function () {
    gulp.src('./build/**/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task("uglify", gulpsync.sync(["uglify:css", "uglify:js"]));

//Minify
const minify = require('gulp-minifier');

gulp.task('minify', function() {
        gulp.src('./build').pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            minifyJS: true,
            getKeptComment: function (content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(gulp.dest('./build'))
});

//Rename
const rename = require("gulp-rename");

gulp.task('rename:css', function() {
    gulp.src("./build/css/**/*.css")
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest("./build/css"));
});

gulp.task('rename:js', function() {
    gulp.src("./build/js/**/*.js")
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest("./build/js"));
});

gulp.task("rename", gulpsync.sync(["rename:css", "rename:js"]));

// Watch
gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', ['build']);
    gulp.watch('./src/js/**/*.js', ['build']);
    gulp.watch('./templates/**/*.handlebars', ['build']);
    //gulp.watch('./', ['build']);
});

//Reload
gulp.task('reload', browserSync.reload);

//  Build
gulp.task("build", gulpsync.sync(["clean", "compile", "uglify", "rename"]));

// Serve
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

});

gulp.task("serve", ["build", "watch", "browserSync"]);