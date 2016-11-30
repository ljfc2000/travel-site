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
cssImport = require('postcss-import'),
// Importing postcss-mixins package
mixins = require('postcss-mixins');


// Creating another Task named styles
// Using the on() function for error Handling
gulp.task('styles', function() {
	return gulp.src('./app/assets/styles/styles.css')
		.pipe(postcss([cssImport, mixins,  cssvars, nested, autoprefixer]))
		.on('error', function(errorInfo) {
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('./app/temp/styles'));
});




