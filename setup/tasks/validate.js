import { htmlValidator } from 'gulp-w3c-html-validator';

export function validate() {
	return app.src(`${app.path.build.view}/*.html`)
		.pipe(htmlValidator.analyzer())
		.pipe(htmlValidator.reporter());
}