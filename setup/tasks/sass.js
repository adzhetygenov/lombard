import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import prefix from 'gulp-autoprefixer';
import webpCss from 'gulp-webpcss';
import groupMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const style = {
	custom: () => {
		return app.src(app.path.src.css)
			.pipe(app.plugins.plumber(
				app.plugins.notify.onError({
					title: "SASS >> CSS",
					message: "Error: <%= error.message %>"
				})
			))
			.pipe(app.plugins.if(
				app.isDev,
				app.plugins.sourcemaps.init()))
			.pipe(sass())
			.pipe(app.plugins.if(
				app.isBuild,
				app.plugins.combine(
					groupMediaQueries(),
					webpCss({
						webpClass: '.webp',
						noWebpClass: '.no-webp'
					}),
					prefix({
						grid: true
					}),
					app.plugins.replace(/img\/.*\.webp/g, function(str) {
						let fileName = str.match(/[^\/]*$/);
						fileName = fileName.join('');
						let newPath = str.substring(0, str.lastIndexOf("/"));
						newPath = 'img/webp';
			
						return `${newPath}/${fileName}`;
					}),
					app.plugins.replace(/url\(('|"|)\.\.\/img\/.*\.svg('|"|)\)/g, function(str) {
						let fileName;
						let newPath;
						let newPaths = []; // If length of background image > 1 image

						let converted = str.replaceAll(/["'()]/g, '');
						converted = converted.replaceAll('url../', '');

						if ( converted.length > 1) {
							converted = converted.split(', ')
							
							converted.forEach(el => {
								fileName = el.match(/[^\/]*$/);
								fileName = fileName.join('');
								newPath = `url(../img/svg/${fileName})`

								newPaths.push(newPath)
							});
							newPaths = newPaths.join(', ');
							return newPaths;
						}
						fileName = converted.match(/[^\/]*$/);
						fileName = fileName.join('');
						newPath = converted.substring(0, str.lastIndexOf("/"));
						newPath = 'img/svg';
			
						return `${newPath}/${fileName}`;
					})
				)
			))
			.pipe(app.plugins.if(
				app.isDev,
				app.plugins.combine(
					app.plugins.sourcemaps.write(),
					app.dest(app.path.build.css)
				)
			))
			.pipe(app.plugins.if(
				app.isBuild, 
				app.dest(app.path.temp.css)
			))
			.pipe(app.plugins.bs.stream())
	},

	vendor: () => {
		return app.src(app.path.src.vendorCss)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SASS:VENDORS >> CSS",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(sass({
			includePaths: ['node_modules']
		}))
		.pipe(app.plugins.if(
			app.isDev,
			app.dest(app.path.build.css)
		))
		.pipe(app.plugins.if(
			app.isBuild,
			app.dest(app.path.temp.css)
		))
		.pipe(app.plugins.bs.stream())
	}
}