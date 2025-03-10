/** @type {import('next').NextConfig} */

const NextConfig = {
	swcMinify: true,
	images: {
		domains: ["images.microcms-assets.io"],
	},
	async rewrite() {
		return [
			{
				source: "/:slug*",
				destination: "/preview/:slug*",
				has: [
					{
						type: "query",
						key: "preview",
					},
				],
			},
		];
	},
};

const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
});

module.exports = withPWA(NextConfig);
