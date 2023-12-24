import pug from 'gulp-pug'; // Компиляция .pug шаблонов
import data from 'gulp-data'; // Генерация файла с данными
import fs from 'fs'; // Файловая система node.js
import useref from 'gulp-useref'; // Склейка файлов
import webpHtmlNoSvg from 'gulp-webp-html-nosvg'; // Использование webp в html
import cleanCss from 'gulp-clean-css'; // Минификация css файлов после склейки
import purgeCss from 'gulp-purgecss'; // Удаление не используемого css
import through2 from 'through2';

// Инкрементальная сборка Pug
import core from '@emitty/core';
import lang from '@emitty/language-pug';

const parser = lang.parse;
const emitty = core.configure();

emitty.language({
	extensions: ['.pug'],
	parser: parser
});

function getFilter(taskName) {
	return through2.obj(function (file, _encoding, callback) {
		emitty.filter(file.path, app.state.watch[taskName]).then((result) => {
			if (result) {
				this.push(file);
			}
			callback();
		});
	});
}

export const view = () => {
	return app.src(app.path.src.view)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "PUG >> HTML",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.plugins.if(
			app.state.isWatchMode,
			getFilter('view')
		))
		.pipe(data(function(file) {
			return JSON.parse(fs.readFileSync(`${app.path.temp.data}/data.json`))
		}))
		.pipe(pug({
			pretty: true,
			basedir: './src/view'
		}))
		.pipe(app.plugins.if(
			app.isBuild,
			app.plugins.combine(
				webpHtmlNoSvg(),
				app.plugins.replace(/img\/.*\.webp/g, function(str) {
					let fileName = str.match(/[^\/]*$/);
					fileName = fileName.join('');
					let newPath = str.substring(0, str.lastIndexOf("/"));
					newPath = 'img/webp';
		
					return `${newPath}/${fileName}`;
				}),
				app.plugins.replace(/img\/.*\.svg/g, function(str) {
					let fileName = str.match(/[^\/]*$/);
					fileName = fileName.join('');
					let newPath = str.substring(0, str.lastIndexOf("/"));
					newPath = 'img/svg';
		
					return `${newPath}/${fileName}`;
				}),
				useref( { searchPath: app.path.temp._self } ),
				app.plugins.if(
					'*.js',
					app.plugins.rev()
				),
				app.plugins.if(
					'*.css',
					app.plugins.combine(
						cleanCss(),
						app.plugins.rev()
					)
				),
				app.plugins.revReplace()
			)
		))
		.pipe(app.dest(app.path.build.view))
		.pipe(app.plugins.bs.stream())
}