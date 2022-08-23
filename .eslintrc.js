module.exports = {
	extends: ["next/core-web-vitals", "prettier"],
	rules: {
		"react/react-in-jsx-scope": "off",
	},
	plugins: ["import", "unused-imports"],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"import/order": [
			"error",
			{
				groups: [
					["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
				],
				"newlines-between": "always",
				pathGroupsExcludedImportTypes: ["builtin"],
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
				pathGroups: [
					{
						pattern: "@/components/common",
						group: "internal",
						position: "before",
					},
					{
						pattern: "@/components/hooks",
						group: "internal",
						position: "before",
					},
				],
			},
		],
		"unused-imports/no-unused-imports": "error",
	},
};
