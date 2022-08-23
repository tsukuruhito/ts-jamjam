module.exports = {
	extends: ["next/core-web-vitals", "prettier"],
	rules: {
		"react/react-in-jsx-scope": "off",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
