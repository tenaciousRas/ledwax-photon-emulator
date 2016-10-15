var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function() {
  nodemon({ script : './emulator.js', legacyWatch: true, watch: ['config', 'routes', 'emulator.js'], ext : 'js' });
});
