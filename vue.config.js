module.exports = {
	css: {
		loaderOptions: {
			scss: {
				additionalData: `
@import "@/scss/_variables.scss";
@import "@/scss/_mixins.scss";
@import "@/scss/_functions.scss";
				`
			}
		}
	},
	devServer: {
		proxy: 'http://localhost:8082'
	}
}