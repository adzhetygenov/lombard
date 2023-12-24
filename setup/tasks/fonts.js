import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';


export const fonts = {
	otfToTtf: () => {
		return app.src(`${app.path.src.fonts}/*.otf`)
			.pipe(app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'FONTS',
					message: 'Error: <%= error.message %>'
				})
			))
			.pipe(fonter({
				formats: ['ttf']
			}))
			.pipe(app.dest(`${app.path.src.fonts}`))
	},

	ttf2woff: () => {
		return app.src(`${app.path.src.fonts}/*.ttf`)
			.pipe(app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'FONTS:OTF2TTF',
					message: 'Error: <%= error.message %>'
				})
			))
			.pipe(fonter({
				formats: ['woff']
			}))
			.pipe(app.dest(app.path.build.fonts))
			.pipe(app.src(`${app.path.src.fonts}/*.ttf`))
			.pipe(ttf2woff2())
			.pipe(app.dest(`${app.path.build.fonts}`))
	},

	fontsToSass: (cb) => {

		let fontsFile = `${app.path.src._self}/sass/base/fonts.scss`;

		fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
			if (fontsFiles) {
				if (!fs.existsSync(fontsFile)) {
					fs.writeFile(fontsFile, '', cb);

					let newFileOnly;

					for( let i = 0; i < fontsFiles.length; i++) {
						let fontFileName = fontsFiles[i].split('.')[0];

						if ( newFileOnly !== fontFileName ) {
							let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
							let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

							switch ( fontWeight.toLowerCase() ) {
								case 'thin':
									fontWeight = 100;
									break;

								case 'extralight':
									fontWeight = 200;
									break;

								case 'ligth':
									fontWeight = 300;
									break;

								case 'medium':
									fontWeight = 500;
									break;

								case 'semibold':
									fontWeight = 600;
									break;
								
								case 'bold':
									fontWeight = 700;
									break;

								case 'extrabold':
								case 'heavy':
									fontWeight = 800;
									break;

								case 'black':
									fontWeight = 900;
									break;

								default:
									fontWeight = 400;
							}

							fs.appendFile(fontsFile,
								`\n@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url('../fonts/${fontFileName}.woff2') format('woff2'), url('../fonts/${fontName}.woff') format('woff');\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;}`
								, cb)

							newFileOnly = fontFileName;
						}

					}
				}
				else {
					console.error('File already exists. Please, delete and try again.')
				}
			}
		})
		cb();
	}
}