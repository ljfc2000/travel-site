//Defining var gulp and importing the package
var gulp = require('gulp'),
// Importing or Requiring gulp-postcss package
postcss = require('gulp-postcss'),
// Importing autoprefixer
autoprefixer = require('autoprefixer'),
// Importing postcss-simple-vars package
cssvars = require('postcss-simple-vars'),
// Importing postcss-nested
nested = require('postcss-nested'), 
cssImport = require('postcss-import');






// Creating another Task named styles
gulp.task('styles', function() {
	return gulp.src('./app/assets/styles/styles.css')
		.pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
		.pipe(gulp.dest('./app/temp/styles'));
});