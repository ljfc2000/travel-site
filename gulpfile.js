// Defining our default task, with the gulp var calling the task() method
var gulp = require('gulp'),
// Defining our Gulp watch variable requiring the gulp-watch package
// We can avoid to Declare var each time now, just add a coma! 
watch = require('gulp-watch'),
// Importing or Requiring gulp-postcss package
postcss = require('gulp-postcss'),
// Importing autoprefixer
autoprefixer = require('autoprefixer'),
// Importing postcss-simple-vars package
cssvars = require('postcss-simple-vars'),
// Importing postcss-nested
nested = require('postcss-nested'), 
cssImport = require('postcss-import'),
// Importing create() method from browser-sync package
browserSync = require('browser-sync').create();

// Defining the DEFAULT Task..Needed to Use Gulp
// Passing 2 arguments (taskName, taskFunction )
// And what we want to do is log out to the console a little bit of Text

gulp.task('default', function() {
	console.log("Hooray - You created a Gulp task.");
} );

// Creating another Task named html
gulp.task('html', function() {
	console.log("Imagine something useful being done to your HTML here.");
});

// Creating another Task named styles
gulp.task('styles', function() {
	return gulp.src('./app/assets/styles/styles.css')
		.pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
		.pipe(gulp.dest('./app/temp/styles'));
});

// Creating a WATCH Task
gulp.task('watch', function() {
	// Adding a new line for our new browserSync variable
	// But the first thing that we do is Initialize it by calling the 'init'
	// method and we want to set up a few settings
	// by telling to browserSync where our website lives
	// we need to do that because browserSync spins up a little web server onto our computer
	// and therefore indicate where our index.html file is
	// so we say server and then we give a bit of information, like how the server should be set up
	// and we say that the base directory is should simply be our 'app' folder
	browserSync.init({
		server: {
			baseDir: "app"
		}
	});
	// Passing the watch() 2 arguments: 1.File we want to watch, 2.Action we want to do with it
	// And whenever we make a change to index.html, it Triggers our html Task
	watch('./app/index.html', function() {
		//gulp.start('html'); // html is the name of the Task we want to Start.
		//whenever we make changes to our HTML file we want a reload
		browserSync.reload()
	} );

	// Let's create a new WATCH Task for that CSS folder 
	// ** is a Hypothetical Folder with an Hypothetical file with a css extension = *.css
	// Renaming 'styles' to trigger 'cssInject'
	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject');
	} );

});
// Creating a brand new task that we name cssInject
// And we want that task to take the contents of our compiled CSS file
// And we want to hand it over to browserSync so it can inject those styles into the page on the fly
// Adding 'styles' as a Dependency of cssInject
gulp.task('cssInject', ['styles'] , function() {
	// telling gulp.source where our CSS file lives
	return gulp.src('./app/temp/styles/styles.css')
		// and we pipe it into browserSync with the stream() method
		.pipe(browserSync.stream());
		// and because that line of Code starts with gulp.src which a Asynchronous function
		// let's make sure to begin with return 
});




