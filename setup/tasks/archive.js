import zip from 'gulp-zip';

export const archive = () => {
	app.plugins.del(`./${app.path.root}.zip`);

	return app.src(`${app.path.build._self}/**/*.*`)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'ARCHIVE',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(zip(`${app.path.root}.zip`))
		.pipe(app.gulp.dest('./'))
}