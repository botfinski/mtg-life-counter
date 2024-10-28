module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		indent: "off",
		"no-tabs": 0,
		"react/jsx-indent-props": [2, "tab"],
		"react/jsx-indent": [2, "tab"],
		"react/react-in-jsx-scope": "off",
		"react/jsx-filename-extension": [
			1,
			{ extensions: [".js", ".jsx", ".ts", ".tsx"] },
		],
		"import/extensions": "off",
		"linebreak-style": ["error", "windows"],
		"react/prop-types": "off",
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
