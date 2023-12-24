import gulp from 'gulp';

import { path } from './setup/config/path.js';

// Exporting commonly used plugins object
import { plugins } from './setup/config/plugins.js';

// Main Tasks import block
import { copy } from './setup/tasks/copy.js';
import { clean } from './setup/tasks/clean.js';
import { view } from './setup/tasks/view.js';
import { data } from './setup/tasks/data.js';
import { server } from './setup/tasks/server.js';
import { style } from './setup/tasks/sass.js';
import { js } from './setup/tasks/js.js';
import { image } from './setup/tasks/image.js';
import { fonts } from './setup/tasks/fonts.js';
import { archive } from './setup/tasks/archive.js';
import { purge } from './setup/tasks/purgeCss.js';
import { validate } from './setup/tasks/validate.js';

global.app = {
	state: {
		isWatchMode: false,
		watch: {
			templates: undefined
		}
	},
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	plugins: plugins,
	gulp: gulp,
	src: gulp.src,
	dest: gulp.dest,
	path: path,
}

function watchInit(done) {
	app.state.isWatchMode = true;

	done();
}

function watcher() {
	gulp.watch(path.watch.misc, copy);
	gulp.watch(path.watch.data, data);
	gulp.watch(path.watch.view, view).on('all', (event, changed) => {
		// Logs the changed file for the templates task
		app.plugins.log(`${app.plugins.chalk.bold.green(changed)} is being compiled`);
		app.state.watch.templates = changed;
	});
	gulp.watch(path.watch.css, style.custom);
	gulp.watch(path.watch.vendorCss, style.vendor);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.img, image.copySourceImage);
	gulp.watch(path.watch.svg, image.copySvgImage);
}

const font = gulp.series(fonts.otfToTtf, fonts.ttf2woff, fonts.fontsToSass);

const images = app.isBuild ? gulp.series(image.copySourceImage, image.copySvgImage, image.convertToWebp, image.optimizeImage): gulp.series(image.copySourceImage, image.copySvgImage);

const main = gulp.series(watchInit, font, gulp.parallel(style.custom, style.vendor, js, images), view);

const build = gulp.series(clean, copy, data, main)

const dev = gulp.series(
	clean,
	copy,
	data,
	main,
	server,
	watcher
);

export { dev };
export { build };
export { archive };
export { purge };
export { validate };

gulp.task('default', dev )