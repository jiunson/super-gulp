import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";

const routes = {
    pug: {
        watch: "src/**/*.pug",
        src: "src/*.pug",    
        dest: "build"
    }
}

// Tasks
const pug = () => 
    gulp.src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));
const clean = () => del(["build"]);
const webserver = () => gulp.src("build").pipe(ws({livereload: true, open: true}));
const watch = () => {
    gulp.watch(routes.pug.watch, pug)
};

// 준비.
const prepare = gulp.series([clean]);

// 컴파일.
const assets = gulp.series([pug]);

// 웹서버 실행하고 파일의 변동사항을 지켜본다. 
const postDev = gulp.parallel([webserver, watch]);

// dev task를 순차적으로 실행한다.
// export하지 않는다면, console이나 package.json에서 dev를 사용하지 못한다.
export const dev = gulp.series([prepare, assets, postDev]);