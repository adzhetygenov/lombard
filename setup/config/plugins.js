import replace from 'gulp-replace';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import bs from 'browser-sync';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import gulpIf from 'gulp-if';
import newer from 'gulp-newer';
import combiner from 'stream-combiner2';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import debug from 'gulp-debug';
import log from 'fancy-log';
import chalk from 'chalk';

/* Exporting plugins
   used throughout a project
*/

export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	bs: bs,
	rev: rev,
	if: gulpIf,
	newer: newer,
	combine: combiner.obj,
	sourcemaps: sourcemaps,
	del: del,
	revReplace: revReplace,
	debug: debug,
	log: log,
	chalk: chalk
}