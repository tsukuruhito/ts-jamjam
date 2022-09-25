/** @type {import('next').NextConfig} */

const NextConfig = {
	swcMinify: true,
	images: {
		domains: ["images.microcms-assets.io"],
	},
};

const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
});

module.exports = withPWA(NextConfig);
