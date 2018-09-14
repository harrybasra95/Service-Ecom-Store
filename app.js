const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const stylus = require('gulp-stylus');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

const frontroutes = require('./routes/frontroutes');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(frontroutes);

//gulp start

const initialPaths = {
  scripts: './public/js/*',
  images: './public/img/*',
  styles: './public/css/*'
};

const finalPaths = {
  scripts: './public/min/js',
  images: './public/min/img',
  styles: './public/min/css'
};


//scripts

gulp.task('scripts',()=>{
	return gulp.src(initialPaths.scripts)
	.pipe(uglify())
	.pipe(gulp.dest(finalPaths.scripts));
});

//styles

gulp.task('styles', function () {
  return gulp.src(initialPaths.styles)
    .pipe(stylus({
      compress: true
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(finalPaths.styles));
});

//images

gulp.task('images', function () {
  return gulp.src(initialPaths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(finalPaths.images));
});


//watch

gulp.task('watch', function() {
  gulp.watch(initialPaths.scripts, ['scripts']);
  gulp.watch(initialPaths.styles, ['styles']);
});

gulp.task('default', ['watch', 'scripts', 'images']);

gulp.start()


//gulp end



app.listen(3000,()=>{
	console.log('server is running at port 3000');
});	