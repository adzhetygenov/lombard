import mergeJson from 'gulp-merge-json';
import path from 'path';

export const data = () => {
	return app.src(app.path.src.data)
		.pipe(mergeJson({
			fileName: 'data.json',
			edit: (json, file) => {
				// Extract the filename and strip the extension
				let filename = path.basename(file.path, '.pug'),
					primaryKey = filename.replace(path.extname(filename), '');

				// Set the filename as the primary key for our JSON data
				let data = {};
				data[primaryKey] = json;

				return data;
			}
		}))
		.pipe(app.dest(app.path.temp.data))
}