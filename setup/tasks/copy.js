export const copy = () => {
	return app.src(app.path.src.misc)
		.pipe(app.plugins.newer(app.path.build.misc))
		.pipe(app.plugins.debug({
			title: 'COPY'
		}))
		.pipe(app.dest(app.path.build.misc))
}