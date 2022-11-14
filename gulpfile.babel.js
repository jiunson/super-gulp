import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";

const sass = require('gulp-sass')(require('sass'));

const routes = {
    pug: {
        watch: "src/**/*.pug",
        src: "src/*.pug",    
        dest: "build"
    },
    img: {
        src: "src/img/*",
        dest: "build/img"
    },
    scss: {
        watch: "src/scss/**/*.scss",
        src: "src/scss/style.scss",
        dest: "build/css"
    }
}

// Tasks
const pug = () => 
    gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build"]);

const webserver = () => gulp.src("build").pipe(ws({livereload: true, open: true}));

const img = () => 
    gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const styles = () =>
    gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(routes.scss.dest));

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.img.src, img);
    gulp.watch(routes.scss.watch, styles);
};

//----------------------------------------------------------------------------------- 

// 준비과정.
const prepare = gulp.series([clean, img]);

// 컴파일.
const assets = gulp.series([pug, styles]);

// 웹서버 실행하고 파일의 변동사항을 지켜본다. 
const postDev = gulp.parallel([webserver, watch]);

// dev task를 순차적으로 실행한다.
// export하지 않는다면, console이나 package.json에서 dev를 사용하지 못한다.
export const dev = gulp.series([prepare, assets, postDev]);