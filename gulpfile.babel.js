import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";

const routes = {
    pug: {
        src: "src/*.pug",    
        dest: "build"
    }
}

const pug = () => 
    gulp.src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));


const clean = () => del(["build"]);

// 준비 과정.
const prepare = gulp.series([clean]);

// 컴파일 과정.
const assets = gulp.series([pug]);

// dev task를 순차적으로 실행한다.
// export하지 않는다면, console이나 package.json에서 dev를 사용하지 못한다.
export const dev = gulp.series([prepare, assets]);