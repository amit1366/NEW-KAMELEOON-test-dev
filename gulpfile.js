const gulp = require('gulp');
const { build } = require('./gulp-tasks/build');
const { deploy } = require('./gulp-tasks/deploy');
const { find } = require('./gulp-tasks/find');
const { create } = require('./gulp-tasks/create');
const { sim } = require('./gulp-tasks/simulation');
const { copySegments } = require('./gulp-tasks/copySegments')

gulp.task(build);
gulp.task('deploy', deploy);
gulp.task('find', find);
gulp.task('create', create);
gulp.task('sim', sim);
gulp.task('seg', copySegments);


/**
 * CREATE
 * create a prjects based on a config file
 * config file needs to be present in the folder.
 * example config.json can be found here: '99998-example_client/524m7ldbqb-example-page.com/experiments/run_to_test_create_task/config.json'
 * 
 * run: gulp create --path {realtive/path/to/new/project}
 * example: gulp create --path "99998-example_client/524m7ldbqb-example-page.com/experiments/run_to_test_create_task"
 */

/**
 * SIM
 * generate a simulation link for a project
 * 
 * run: gulp sim --path {realtive/path/to/project}
 * example: gulp sim --path "99998-example_client/524m7ldbqb-example-page.com/experiments/123456-test_experiment"
 */

/**
 * SEG
 * copy a segment from one experiemtn to another (not restricted to one account)
 * 
 * run: gulp seg --copyPath {realtive/path/to/project/of/existing/segment} --pastePath {realtive/path/to/project/of/copied/segment}
 * example: gulp seg --copyPath "99998-example_client/524m7ldbqb-example-page.com/experiments/123456-test_experiment" --pastePath "99998-example_client/524m7ldbqb-example-page.com/experiments/123457-test_experiment"
 */