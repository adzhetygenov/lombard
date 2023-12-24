import purgeCss from 'gulp-purgecss';

export const purge = () => {
	return app.src(`${app.path.build.css}**/*.css`)
		.pipe(purgeCss({
			content: [`${app.path.build.view}/*.html`],
			safelist: ['webp', 'no-webp']
		}))
		.pipe(app.dest(app.path.build.css))
}