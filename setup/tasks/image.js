import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const image = {
	convertToWebp: () => {
		return app.src(`${app.path.temp.filesToConvert}.{jpg,jpeg,png,webp,gif}`)
			.pipe(app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'IMAGES:CONVERT2WEBP',
					message: 'Error: <%= error.message %>'
				})
			))
			.pipe(webp())
			.pipe(app.dest(`${app.path.build.img}/webp`))
	},

	copySourceImage: () => {
		return app.src(app.path.src.img)
			.pipe(app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'IMAGES:GET SOURCE IMAGE',
					message: 'Error: <%= error.message %>'
				})
			))
			.pipe(app.plugins.if(
				app.isDev,
				app.plugins.combine(
					app.plugins.newer(app.path.build.img),
					app.dest(app.path.build.img))
				)
			)
			.pipe(app.plugins.if(
				app.isBuild,
				app.dest(app.path.temp.img)
			))
			.pipe(app.plugins.bs.stream())
	},

	copySvgImage: () => {
		return app.src(app.path.src.svg)
			.pipe(app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'IMAGES:COPY SVG IMAGES',
					message: 'Error: <%= error.message %>'
				})
			))
			.pipe(app.plugins.if(
				app.isDev,
				app.plugins.combine(
					app.plugins.newer(app.path.build.img),
					app.dest(app.path.build.img))
				)
			)
			.pipe(app.plugins.if(
				app.isBuild,
				app.dest(`${app.path.temp.img}/svg`)
			))
			.pipe(app.plugins.bs.stream())
	},

	optimizeImage: () => {
		return app.src(`${app.path.temp.img}/**/*`)
			.pipe(app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'IMAGES:COPY SVG IMAGES',
					message: 'Error: <%= error.message %>'
				})
			))
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3
			}))
			.pipe(app.dest(app.path.build.img))
	},

}