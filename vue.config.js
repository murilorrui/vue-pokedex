module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `
          @import "@/shared/styles/functions";
          @import "@/shared/styles/colors";
          @import "@/shared/styles/variables";
        `
			},
		},
	},
};
