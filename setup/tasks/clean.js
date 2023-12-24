export const clean = () => {
	return app.plugins.del([ app.path.clean, app.path.temp._self, `${app.path.src._self}/sass/fonts.sass`] )
}