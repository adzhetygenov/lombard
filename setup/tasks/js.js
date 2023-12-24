import webpack from 'webpack-stream';

export const js = () => {
	return app.src(app.path.src.js)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'JS',
				message: 'Error <%= error.message %>'
			})
		))
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'development',
			output: {
				filename: 'app.min.js'
			}
		}))
		.pipe(app.plugins.if(
			app.isDev,
			app.dest(app.path.build.js)
		))
		.pipe(app.plugins.if(
			app.isBuild,
			app.dest(app.path.temp.js)
		))
		.pipe(app.plugins.bs.stream())
}