export const server = (done) => {
	app.plugins.bs.init({
		server: {
			baseDir: `${app.path.build.view}`
		},
		notify: false,
		logFileChanges: false,
	})
	done();
}