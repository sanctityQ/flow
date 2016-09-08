/**
 * @file gulpfile.js
 * @desc 自动化脚本
 * @author xiaoguang01
 * @date 2016/7/25
 * @extends 提升打包效率，做了以下调整：
 * @extension >>使用babel统一打包，增加对es6支持
 * @extension >>分离公共css文件，分开打包，只打包一次
 * @extension >>分离公共js文件，分开打包，只打包一次
 * @extension >>整合npm install, bower install，添加至前置任务中
 */
'use strict';

let path = require('path');

let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let livereload = require('gulp-livereload');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let less = require('gulp-less');
let minifyCss = require('gulp-minify-css');
let gutil = require('gulp-util');
let gulpSequence = require('gulp-sequence');
let rename = require('gulp-rename');

let child_process = require('child_process');
let shell = require('shelljs');
const pwd = shell.pwd();

let fecs = require('fecs-gulp');
let fs = require('fs');
let opn = require('opn');

let webpack = require('webpack-stream');
let wp = require('webpack');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
let webpackDllConfig = require("./webpack.dll.config.js");

gulp.task('start', () => {
  //切为到当前目录
  shell.cd(pwd);
  gulp.src('conf/dev/index.js').pipe(gulp.dest('conf'));
  return nodemon({
    script: './app/bootStrap.js',
    cache: true,
    verbose: true,
    ext: 'js',
    execMap: {
      js: 'node --harmony'
    },
    args: ['--color'],
    ignore: [path.join(__dirname, 'conf/index.js'), path.join(__dirname, 'client/**/*.*'), path.join(__dirname, 'gulpfile.js')]
  });
});

gulp.task('startTest', () => {
  gulp.src('conf/test/index.js').pipe(gulp.dest('conf'));
  nodemon({
    script: './app/bootStrap.js',
    ext: 'js',
    execMap: {
      js: 'node --harmony'
    },
    args: ['--color'],
    ignore: ['conf/index.js', 'client/**/**', 'gulpfile.js']
  });
});

//打包公共js文件，提升webpack效率
gulp.task('dll', (done) => {
  let config = Object.create(webpackDllConfig);
  wp(config, (err, stats) => {
    if(err) throw new gutil.PluginError('webpack:dll', err);
    gutil.log('[webpack:dll]', stats.toString({
      colors: true
    }));
    done();
  });
});

//提取公共样式，提前编译
gulp.task('extractBaseCSS', (done) => {
  gulp.src('client/src/style/base.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('client/build'))
    .on('end', done);
});

//拷贝font至build目录，修复font文件在打包后损坏
gulp.task('copyFont', (done) => {
  // 拷贝iconfont文件
  gulp
    .src(['client/src/vendor/bower_components/**/*.{ttf,woff,eot,svg,woff2,otf}'
        , 'client/src/style/**/*.{ttf,woff,eot,svg,woff2,otf}'])
    .pipe(gulp.dest('client/build/vendor/bower_components/'))
    .on('end', done);
});

// 监听静态文件和模板以及pid修改，并刷新页面
gulp.task('watch', () => {
  livereload.listen();
  gulp.watch(['./pid', 'client/src/**/*.*', '!client/src/vendor/**/*.*'], ['react']);
});

//open chrome browser
gulp.task('open', () => {
  opn('http://127.0.0.1:8000', {
    app: ['google chrome']
  });
});

//install node_modules and bower_components
gulp.task('install', () => {
  let bowerPath = path.join(__dirname, 'client/src/vendor');
  let npmPath = __dirname;

  console.log('install dependencies start');

  child_process.execSync('npm install', [
    '--registry=https://registry.npm.taobao.org',
    '--disturl=https://npm.taobao.org/dist'], {
    stdio: 'inherit',
    cwd: npmPath
  });

  child_process.execSync('bower install', {
    stdio: 'inherit',
    cwd: bowerPath
  });

  console.log('install dependencies finished');
});

//删除AdminLTE.css中的引用，防止webpack打包下载该资源失败
//@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic);
gulp.task('remove-googlefont', (done) => {
  let adminlteCSSPath = path.join(__dirname, 'client/src/vendor/bower_components', 'AdminLTE/dist/css/AdminLTE.css');
  let newAdminlteCSSPath = path.join(__dirname, 'client/src/vendor/bower_components', 'AdminLTE/dist/css/AdminLTE_new.css');
  
  let readStream = fs.createReadStream(adminlteCSSPath);
  let writeStream = fs.createWriteStream(newAdminlteCSSPath);

  readStream.on('data', (chunk) => {
    let content = new Buffer(chunk);
    content = content.toString().replace(/(@import\s+url\(https:\/\/fonts\.googleapis.+\);)/g, '/**$1**/');
    if (writeStream.write(content) == false) {
      readStream.pause();
    }
  })
  .on('end', () => {
    writeStream.end();
    done();
  });

  writeStream.on('drain', () => {
    readStream.resume();
  });
});

gulp.task('react', () => (
  gulp.src('client/src/js/app.js').pipe(webpack({
    // entry: {
    //   bundle: './client/src/js/app.js'
    //   // ,vendor: ['react', 'react-dom', 'reflux', 'classnames']
    // },
    cache: true,
    output: {
      filename: 'bundle.js',
    },
    plugins: [
      // new wp.optimize.CommonsChunkPlugin('vendor',  'base.js'),
      // new ExtractTextPlugin('base.css'),
      new wp.DllReferencePlugin({
        context: __dirname,
        /**
         * 在这里引入 manifest 文件
         */
        manifest: require('./client/build/base-manifest.json')
      })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style!css"
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.(woff2|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=60000&name=[path][name].[ext]'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8111192&name=[path][name].[ext]'
      }]
    }
  }, null, (err, stats) => {
    if(err) throw new gutil.PluginError('webpack:react', err);
    
    gutil.log('[webpack:react]', stats.toString({
      colors: true
    }));

  })).pipe(gulp.dest('client/build')).pipe(livereload())
));

gulp.task('build', ['pre-task'], () => (
    gulp.src('client/src/js/app.js').pipe(webpack({
    cache: true,
    output: {
      filename: 'bundle.js',
    },
    plugins: [
      new wp.DllReferencePlugin({
        context: __dirname,
        /**
         * 在这里引入 manifest 文件
         */
        manifest: require('./client/build/base-manifest.json')
      }),
      new wp.optimize.UglifyJsPlugin({
        minimize: true
      })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.(woff2|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=60000&name=[path][name].[ext]'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8111192&name=[path][name].[ext]'
      }]
    }
  }, null, (err, stats) => {
    if(err) throw new gutil.PluginError('webpack:react', err);
    
    gutil.log('[webpack:react]', stats.toString({
      colors: true
    }));

  })).pipe(gulp.dest('client/build'))
));

//前置操作
gulp.task('pre-task', gulpSequence('remove-googlefont', 'copyFont', 'extractBaseCSS', 'dll'));

// 运行Gulp时，默认的Task
gulp.task('dev', ['pre-task'], gulpSequence('start', 'watch', 'open', 'react'));

//部署pm2 启动服务
gulp.task('deploy-start', ['build'], () => {
  shell.exec('rm ./conf/index.js');
  shell.exec('cp ./conf/online/index.js ./conf/index.js');
  shell.exec('pm2 start ./app/bootStrap.js');
});

//部署pm2 停止服务
gulp.task('deploy-stop', () => {
  let bootstrapPath = path.join(__dirname, 'app/bootStrap.js');
  shell.exec('pm2 stop ' + bootstrapPath);
});

gulp.task('test', gulpSequence('startTest', 'watch', 'open', 'build'));