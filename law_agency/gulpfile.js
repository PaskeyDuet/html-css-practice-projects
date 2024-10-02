const gulp              = require('gulp');
const posthtml          = require("gulp-posthtml");
const autoprefixer      = require('gulp-autoprefixer');
const less              = require('gulp-less');
const cleanCSS          = require('gulp-clean-css');
const sourcemaps        = require('gulp-sourcemaps');
const gcmq              = require('gulp-group-css-media-queries');
const plumber           = require("gulp-plumber");
const imagemin          = require('gulp-imagemin');
// const webp              = require('gulp-webp');
const svgstore          = require("gulp-svgstore");
const cheerio           = require('gulp-cheerio');
const rename            = require('gulp-rename');
const uglify            = require('gulp-uglify-es').default;
const webpack           = require('webpack-stream');
const concat            = require('gulp-concat');
const gulpif            = require('gulp-if');
const del               = require('del');
const browserSync       = require('browser-sync').create();

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);

let config = {
    src: './src',
    build: './build',
    html: {
        src: '/*.html',
        dest: '/'
    },
    fonts: {
        src: '/fonts/*',
        dest: '/fonts/'
    },
    js: {
        src: '/js/*.js',
        dest: '/js/'
    },
    img: {
        src: '/img/**/*',
        dest: '/img/'
    },
    css: {
        src: '/css/*',
        dest: '/css/'
    },
    less: {
        watch: '/less/**/*.less',
        src: '/less/styles.less',
        dest: '/css/'
    }
};

let webpackConfig = {
    output: {
        filename: 'all.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    externals: {
        moment: 'moment'
    },
    mode: isDev ? 'development' : 'production'
};

const html = () => {
    return gulp.src(config.src + config.html.src)
        .pipe(gulp.dest(config.build + config.html.dest))
        .pipe(gulpif(isSync, browserSync.stream()));
}

exports.html = html;

const styles = () => {
    return gulp.src(config.src + config.less.src)
        .pipe(less())
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(gcmq())
        .pipe(autoprefixer({
            overrideBrowserslist: ['defaults'],
            cascade: false
        }))
        .pipe(gulpif(isDev, gulp.dest(config.build + config.less.dest)))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(rename("style.min.css"))
        .pipe(gulpif(isDev, sourcemaps.write('.')))
        .pipe(gulp.dest(config.build + config.less.dest))
        .pipe(gulpif(isSync, browserSync.stream()));
}

exports.styles = styles;

const grid = (done) => {
    delete require.cache[require.resolve('./smartgrid.js')];
    let settings = require('./smartgrid.js');
    smartgrid('./src/less', settings);
    done();
}

exports.grid = grid;

const img = () => {
    return gulp.src(config.src + config.img.src)
        /*
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.jpegtran({progressive: true}),
            imagemin.gifsicle({interlaced: true}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        */
        /*
        .pipe(gulp.dest(config.build + config.img.dest))
        .pipe(webp({
            quality: 70,
            preset: 'photo',
            lossless: true
        }))
        */
        .pipe(gulp.dest(config.build + config.img.dest));
}

exports.img = img;

const js = (done) => {
   
    let jsArray = [
        'src/js/jquery-3.3.1.min.js',
        'src/js/slick.min.js',
        'src/js/main.js'
    ];

    return gulp.src(jsArray)
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulpif(isDev, sourcemaps.write('.')))
        .pipe(gulp.dest(config.build + config.js.dest))
        .pipe(gulpif(isSync, browserSync.stream()));
        done();
}
/*
const js = (done) => {
    return gulp.src(config.src + '/js/index.js')
        // .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(webpack(webpackConfig))        
        // .pipe(gulpif(isDev, sourcemaps.write('.')))
        .pipe(gulp.dest(config.build + config.js.dest))
        .pipe(gulpif(isSync, browserSync.stream()));
        done();
}
*/

exports.js = js;

const fonts = () => {
    return gulp.src(config.src + config.fonts.src)
        .pipe(gulp.dest(config.build + config.fonts.dest));
}

exports.fonts = fonts;

const sprite = () => {
    return gulp.src(config.src + config.img.src  + 'icon-*.svg')
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest(config.build + config.img.dest));
}

exports.sprite = sprite;

const clean = () => {
    return del(['build/*']);
}

exports.clean = clean;

const watch = () => {
    if (isSync) {
        browserSync.init({
            server: {
                baseDir: config.build
            }
        });
    }

    gulp.watch(config.src + config.html.src, html);
    gulp.watch(config.src + config.less.watch, styles);
    gulp.watch(config.src + config.img.src, img);
    gulp.watch(config.src + config.js.src, js);
    gulp.watch('./smartgrid.js', grid);
}

exports.watch = watch;

const build = gulp.series(
    clean,
    gulp.parallel(
        html,
        styles,
        js,
        img,
        fonts,
        sprite
    )
);

exports.build = build;

exports.default = gulp.series(
    build,
    watch
);