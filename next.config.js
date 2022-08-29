/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
	pwa: {
		dest: "public",
		runtimeCaching,
	},
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["images.microcms-assets.io"],
	},
})