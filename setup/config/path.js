import * as nodePath from 'path';
const root = nodePath.basename(nodePath.resolve());

const src = './src';
const build = './dist';
const temp = './temp';
const watch = src;
const clean = build;

export const path = {

		build: {
			_self: build,
			view: build,
			css: `${build}/style/`,
			misc: `${build}/misc/`,
			js: `${build}/js/`,
			img: `${build}/img/`,
			fonts: `${build}/fonts/`
		},

		src: {
			_self: src,
			view: `${src}/view/*.pug`,
			css: `${src}/sass/main.scss`,
			data: `${src}/data/**/*.json`,
			misc: `${src}/misc/**/*.*`,
			vendorCss: `${src}/sass/vendor.scss`,
			js: `${src}/js/app.js`,
			img: `${src}/img/**/*.{jpg,jpeg,png,webp,gif}`,
			svg: `${src}/img/**/*.svg`,
			fonts: `${src}/fonts`,
		},

		watch: {
			view: `${watch}/view/**/*.pug`,
			css: [`${watch}/sass/**/*.scss`, `!${watch}/sass/vendors/*`, `!${watch}/sass/vendor.scss`],
			vendorCss: [`${watch}/sass/vendors/*.scss`, `${watch}/sass/vendor.scss`],
			js: `${watch}/js/**/*.js`,
			img: `${watch}/img/**/*.{jpg,jpeg,png,webp,gif}`,
			svg: `${watch}/img/**/*.svg`,
			misc: `${watch}/misc/**/*.*`,
			data: `${watch}/data/**/*.json`
		},

		clean: clean,

		temp: {
			_self: temp,
			css: `${temp}/style`,
			js: `${temp}/js`,
			img: `${temp}/img`,
			data: `${temp}/data`,
			filesToConvert: `${temp}/img/**/*`
		},

		root: root
}